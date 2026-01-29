#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import prompts from 'prompts'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const TOPICS = [
  { title: '01-fundamentals', value: '01-fundamentals' },
  { title: '02-hooks', value: '02-hooks' },
  { title: '03-styling', value: '03-styling' },
  { title: '04-state-patterns', value: '04-state-patterns' },
  { title: '05-performance', value: '05-performance' },
]

const TYPES = [
  { title: 'Fix Broken Code', value: 'fix-broken' },
  { title: 'Complete Missing Parts', value: 'complete-missing' },
  { title: 'Build From Scratch', value: 'build-from-scratch' },
]

const DIFFICULTIES = [
  { title: 'Beginner', value: 'beginner' },
  { title: 'Intermediate', value: 'intermediate' },
  { title: 'Advanced', value: 'advanced' },
]

async function main() {
  console.log(chalk.blue.bold('\n🎓 Create New React Exercise\n'))

  const answers = await prompts([
    {
      type: 'select',
      name: 'topic',
      message: 'Select topic:',
      choices: TOPICS,
    },
    {
      type: 'text',
      name: 'name',
      message: 'Exercise name (kebab-case):',
      validate: (value) =>
        /^[a-z0-9-]+$/.test(value) || 'Use lowercase letters, numbers, and hyphens only',
    },
    {
      type: 'text',
      name: 'title',
      message: 'Exercise title:',
    },
    {
      type: 'select',
      name: 'type',
      message: 'Exercise type:',
      choices: TYPES,
    },
    {
      type: 'select',
      name: 'difficulty',
      message: 'Difficulty level:',
      choices: DIFFICULTIES,
    },
    {
      type: 'text',
      name: 'estimatedTime',
      message: 'Estimated time (e.g., "15-20 minutes"):',
      initial: '15-20 minutes',
    },
  ])

  if (!answers.topic || !answers.name) {
    console.log(chalk.red('\n❌ Exercise creation cancelled\n'))
    process.exit(0)
  }

  // Find next exercise number in topic
  const topicPath = path.join(rootDir, 'exercises', answers.topic)
  const exercises = await fs.readdir(topicPath).catch(() => [])
  const numbers = exercises
    .map((dir) => parseInt(dir.split('-')[0]))
    .filter((n) => !isNaN(n))
  const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1
  const paddedNumber = String(nextNumber).padStart(2, '0')

  const exerciseName = `${paddedNumber}-${answers.name}`
  const exercisePath = path.join(topicPath, exerciseName)

  // Check if exists
  try {
    await fs.access(exercisePath)
    console.log(chalk.red(`\n❌ Exercise already exists: ${exerciseName}\n`))
    process.exit(1)
  } catch {
    // Doesn't exist, good to proceed
  }

  // Copy template
  const templatePath = path.join(rootDir, 'templates', answers.type)
  console.log(chalk.gray(`\nCopying template from ${answers.type}...`))
  await fs.cp(templatePath, exercisePath, { recursive: true })

  // Update package.json
  const packageJsonPath = path.join(exercisePath, 'package.json')
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
  packageJson.name = `@react-learning/${exerciseName}`
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

  // Update README.md
  const readmePath = path.join(exercisePath, 'README.md')
  let readme = await fs.readFile(readmePath, 'utf-8')
  readme = readme
    .replace(/EXERCISE_TITLE/g, answers.title || answers.name)
    .replace(/DIFFICULTY_LEVEL/g, answers.difficulty)
    .replace(/ESTIMATED_TIME/g, answers.estimatedTime)
  await fs.writeFile(readmePath, readme)

  // Update SOLUTION.md if it exists
  const solutionPath = path.join(exercisePath, 'SOLUTION.md')
  try {
    let solution = await fs.readFile(solutionPath, 'utf-8')
    solution = solution.replace(/EXERCISE_TITLE/g, answers.title || answers.name)
    await fs.writeFile(solutionPath, solution)
  } catch {
    // SOLUTION.md doesn't exist in all templates
  }

  console.log(chalk.green(`\n✅ Exercise created: ${chalk.bold(exerciseName)}`))
  console.log(chalk.gray(`   Location: exercises/${answers.topic}/${exerciseName}`))
  console.log(chalk.blue('\n📝 Next steps:'))
  console.log(chalk.gray(`   1. cd exercises/${answers.topic}/${exerciseName}`))
  console.log(chalk.gray(`   2. Edit src/App.tsx with exercise code`))
  console.log(chalk.gray(`   3. Edit src/App.test.tsx with tests`))
  console.log(chalk.gray(`   4. Update README.md with instructions\n`))
}

main().catch((err) => {
  console.error(chalk.red('\n❌ Error:'), err.message)
  process.exit(1)
})
