#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import chalk from 'chalk'
import { execa } from 'execa'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

async function getExercises() {
  const exercisesDir = path.join(rootDir, 'exercises')
  const topics = await fs.readdir(exercisesDir)

  const exercises = []

  for (const topic of topics) {
    const topicPath = path.join(exercisesDir, topic)
    const stat = await fs.stat(topicPath)
    if (!stat.isDirectory()) continue

    const exerciseNames = await fs.readdir(topicPath)

    for (const exerciseName of exerciseNames) {
      const exercisePath = path.join(topicPath, exerciseName)
      const exerciseStat = await fs.stat(exercisePath)
      if (!exerciseStat.isDirectory()) continue

      // Check if package.json exists
      try {
        await fs.access(path.join(exercisePath, 'package.json'))
        exercises.push({
          topic,
          name: exerciseName,
          path: exercisePath,
          fullName: `${topic}/${exerciseName}`,
        })
      } catch {
        // Skip if no package.json
      }
    }
  }

  return exercises.sort((a, b) => a.fullName.localeCompare(b.fullName))
}

async function runTests(exercise) {
  console.log(chalk.blue(`\n▶ Testing ${chalk.bold(exercise.fullName)}`))

  try {
    const { stdout, stderr } = await execa('pnpm', ['test'], {
      cwd: exercise.path,
      reject: false,
    })

    // Check if tests passed
    const output = stdout + stderr
    const passed = !output.includes('FAIL') && !output.includes('✗')

    if (passed) {
      console.log(chalk.green(`  ✓ ${exercise.fullName} - All tests passed`))
      return { exercise: exercise.fullName, passed: true, output }
    } else {
      console.log(chalk.red(`  ✗ ${exercise.fullName} - Tests failed`))
      console.log(chalk.gray(output))
      return { exercise: exercise.fullName, passed: false, output }
    }
  } catch (error) {
    console.log(chalk.red(`  ✗ ${exercise.fullName} - Error running tests`))
    console.log(chalk.gray(error.message))
    return { exercise: exercise.fullName, passed: false, error: error.message }
  }
}

async function main() {
  console.log(chalk.blue.bold('\n🧪 Running all exercise tests\n'))

  const exercises = await getExercises()

  if (exercises.length === 0) {
    console.log(chalk.yellow('No exercises found.\n'))
    process.exit(0)
  }

  console.log(chalk.gray(`Found ${exercises.length} exercises\n`))

  const results = []

  for (const exercise of exercises) {
    const result = await runTests(exercise)
    results.push(result)
  }

  // Summary
  console.log(chalk.blue.bold('\n📊 Test Summary\n'))

  const passed = results.filter((r) => r.passed).length
  const failed = results.filter((r) => !r.passed).length

  console.log(chalk.green(`  ✓ Passed: ${passed}`))
  console.log(chalk.red(`  ✗ Failed: ${failed}`))
  console.log(chalk.gray(`  Total:  ${results.length}\n`))

  if (failed > 0) {
    console.log(chalk.yellow('Failed exercises:'))
    results
      .filter((r) => !r.passed)
      .forEach((r) => console.log(chalk.red(`  - ${r.exercise}`)))
    console.log()
    process.exit(1)
  }

  console.log(chalk.green.bold('✨ All tests passed!\n'))
}

main().catch((err) => {
  console.error(chalk.red('\n❌ Error:'), err.message)
  process.exit(1)
})
