#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const REQUIRED_FILES = [
  'package.json',
  'README.md',
  'src/App.tsx',
  'src/App.test.tsx',
  'src/main.tsx',
  'tsconfig.json',
  'vite.config.ts',
]

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

      exercises.push({
        topic,
        name: exerciseName,
        path: exercisePath,
        fullName: `${topic}/${exerciseName}`,
      })
    }
  }

  return exercises.sort((a, b) => a.fullName.localeCompare(b.fullName))
}

async function validateExercise(exercise) {
  const issues = []

  for (const file of REQUIRED_FILES) {
    const filePath = path.join(exercise.path, file)
    try {
      await fs.access(filePath)
    } catch {
      issues.push(`Missing file: ${file}`)
    }
  }

  // Check README has required sections
  try {
    const readme = await fs.readFile(path.join(exercise.path, 'README.md'), 'utf-8')
    if (!readme.includes('**Difficulty:**')) issues.push('README missing difficulty')
    if (!readme.includes('**Type:**')) issues.push('README missing type')
    if (!readme.includes('## Learning Objectives')) issues.push('README missing learning objectives')
  } catch {
    // Already caught by file existence check
  }

  return { exercise: exercise.fullName, issues }
}

async function main() {
  console.log(chalk.blue.bold('\n🔍 Validating exercise structure\n'))

  const exercises = await getExercises()

  if (exercises.length === 0) {
    console.log(chalk.yellow('No exercises found.\n'))
    process.exit(0)
  }

  console.log(chalk.gray(`Validating ${exercises.length} exercises...\n`))

  const results = []

  for (const exercise of exercises) {
    const result = await validateExercise(exercise)
    results.push(result)

    if (result.issues.length === 0) {
      console.log(chalk.green(`✓ ${result.exercise}`))
    } else {
      console.log(chalk.red(`✗ ${result.exercise}`))
      result.issues.forEach((issue) => console.log(chalk.yellow(`  - ${issue}`)))
    }
  }

  // Summary
  const withIssues = results.filter((r) => r.issues.length > 0)

  console.log(chalk.blue.bold('\n📊 Validation Summary\n'))
  console.log(chalk.gray(`  Total exercises: ${results.length}`))
  console.log(chalk.green(`  Valid: ${results.length - withIssues.length}`))
  console.log(chalk.red(`  Issues: ${withIssues.length}\n`))

  if (withIssues.length > 0) {
    process.exit(1)
  }

  console.log(chalk.green.bold('✨ All exercises are valid!\n'))
}

main().catch((err) => {
  console.error(chalk.red('\n❌ Error:'), err.message)
  process.exit(1)
})
