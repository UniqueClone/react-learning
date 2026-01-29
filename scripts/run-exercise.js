#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import prompts from 'prompts'
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

      // Try to read README for metadata
      const readmePath = path.join(exercisePath, 'README.md')
      let difficulty = ''
      let type = ''
      try {
        const readme = await fs.readFile(readmePath, 'utf-8')
        const difficultyMatch = readme.match(/\*\*Difficulty:\*\*\s*(\w+)/)
        const typeMatch = readme.match(/\*\*Type:\*\*\s*(.+)/)
        difficulty = difficultyMatch ? difficultyMatch[1] : ''
        type = typeMatch ? typeMatch[1].trim() : ''
      } catch {
        // Ignore if README doesn't exist
      }

      exercises.push({
        topic,
        name: exerciseName,
        path: exercisePath,
        difficulty,
        type,
        title: `${topic}/${exerciseName}`,
      })
    }
  }

  return exercises.sort((a, b) => a.title.localeCompare(b.title))
}

async function main() {
  console.log(chalk.blue.bold('\n🎓 React Learning - Exercise Runner\n'))

  const exercises = await getExercises()

  if (exercises.length === 0) {
    console.log(chalk.yellow('No exercises found. Create one with: pnpm create\n'))
    process.exit(0)
  }

  const choices = exercises.map((ex) => ({
    title: `${chalk.cyan(ex.title)} ${ex.difficulty ? chalk.gray(`[${ex.difficulty}]`) : ''}`,
    value: ex,
    description: ex.type,
  }))

  const { exercise } = await prompts({
    type: 'select',
    name: 'exercise',
    message: 'Select an exercise to run:',
    choices,
  })

  if (!exercise) {
    console.log(chalk.red('\n❌ No exercise selected\n'))
    process.exit(0)
  }

  console.log(chalk.green(`\n✅ Starting: ${chalk.bold(exercise.title)}\n`))
  console.log(chalk.gray(`📂 Location: ${exercise.path}`))
  console.log(chalk.blue('\n🚀 Running dev server...\n'))

  try {
    // Run pnpm dev in the exercise directory
    await execa('pnpm', ['dev'], {
      cwd: exercise.path,
      stdio: 'inherit',
    })
  } catch (error) {
    if (error.exitCode !== 0) {
      console.log(chalk.red('\n❌ Dev server exited\n'))
      process.exit(error.exitCode)
    }
  }
}

main().catch((err) => {
  console.error(chalk.red('\n❌ Error:'), err.message)
  process.exit(1)
})
