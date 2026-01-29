#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const exercises = [
  // Fundamentals (8 new exercises)
  { topic: '01-fundamentals', name: 'props-and-prop-types', title: 'Props and Prop Types', type: 'complete-missing', difficulty: 'beginner', time: '15-20 minutes' },
  { topic: '01-fundamentals', name: 'conditional-rendering', title: 'Conditional Rendering Patterns', type: 'build-from-scratch', difficulty: 'beginner', time: '20-25 minutes' },
  { topic: '01-fundamentals', name: 'lists-and-keys', title: 'Rendering Lists with Keys', type: 'fix-broken', difficulty: 'beginner', time: '15-20 minutes' },
  { topic: '01-fundamentals', name: 'form-inputs', title: 'Controlled Form Inputs', type: 'complete-missing', difficulty: 'intermediate', time: '20-25 minutes' },
  { topic: '01-fundamentals', name: 'component-composition', title: 'Component Composition Patterns', type: 'build-from-scratch', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '01-fundamentals', name: 'event-handling', title: 'Event Handling Deep Dive', type: 'fix-broken', difficulty: 'intermediate', time: '20-25 minutes' },
  { topic: '01-fundamentals', name: 'lifting-state-up', title: 'Lifting State Up', type: 'complete-missing', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '01-fundamentals', name: 'multi-step-form', title: 'Multi-Step Form Navigator', type: 'build-from-scratch', difficulty: 'advanced', time: '30-35 minutes' },

  // Hooks (10 exercises)
  { topic: '02-hooks', name: 'usestate-basics', title: 'useState Fundamentals', type: 'build-from-scratch', difficulty: 'beginner', time: '15-20 minutes' },
  { topic: '02-hooks', name: 'usestate-object', title: 'Managing Object State', type: 'complete-missing', difficulty: 'beginner', time: '20-25 minutes' },
  { topic: '02-hooks', name: 'usestate-array', title: 'Managing Array State', type: 'fix-broken', difficulty: 'intermediate', time: '20-25 minutes' },
  { topic: '02-hooks', name: 'useeffect-basics', title: 'useEffect Lifecycle', type: 'build-from-scratch', difficulty: 'intermediate', time: '20-25 minutes' },
  { topic: '02-hooks', name: 'useeffect-data-fetching', title: 'Data Fetching with useEffect', type: 'complete-missing', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '02-hooks', name: 'custom-hooks-basic', title: 'Creating Custom Hooks', type: 'build-from-scratch', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '02-hooks', name: 'custom-hooks-advanced', title: 'Advanced Custom Hooks', type: 'complete-missing', difficulty: 'advanced', time: '30-35 minutes' },
  { topic: '02-hooks', name: 'usereducer-basics', title: 'useReducer for Complex State', type: 'build-from-scratch', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '02-hooks', name: 'usereducer-advanced', title: 'Advanced useReducer Patterns', type: 'fix-broken', difficulty: 'advanced', time: '30-35 minutes' },
  { topic: '02-hooks', name: 'usecontext-global-state', title: 'Global State with useContext', type: 'build-from-scratch', difficulty: 'advanced', time: '30-35 minutes' },

  // Styling (10 exercises)
  { topic: '03-styling', name: 'css-basics', title: 'Basic CSS Styling', type: 'build-from-scratch', difficulty: 'beginner', time: '15-20 minutes' },
  { topic: '03-styling', name: 'css-modules', title: 'CSS Modules for Scoped Styles', type: 'complete-missing', difficulty: 'beginner', time: '20-25 minutes' },
  { topic: '03-styling', name: 'css-modules-advanced', title: 'Advanced CSS Modules Patterns', type: 'build-from-scratch', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '03-styling', name: 'styled-components-intro', title: 'Styled Components Basics', type: 'build-from-scratch', difficulty: 'beginner', time: '20-25 minutes', deps: ['styled-components'] },
  { topic: '03-styling', name: 'styled-components-theming', title: 'Theming with Styled Components', type: 'complete-missing', difficulty: 'intermediate', time: '25-30 minutes', deps: ['styled-components'] },
  { topic: '03-styling', name: 'tailwind-basics', title: 'Tailwind CSS Fundamentals', type: 'fix-broken', difficulty: 'beginner', time: '20-25 minutes', deps: ['tailwindcss', 'autoprefixer', 'postcss'] },
  { topic: '03-styling', name: 'tailwind-components', title: 'Building Components with Tailwind', type: 'build-from-scratch', difficulty: 'intermediate', time: '25-30 minutes', deps: ['tailwindcss', 'autoprefixer', 'postcss', 'clsx'] },
  { topic: '03-styling', name: 'responsive-design', title: 'Responsive Design Patterns', type: 'complete-missing', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '03-styling', name: 'css-animations', title: 'CSS Animations and Transitions', type: 'build-from-scratch', difficulty: 'intermediate', time: '30-35 minutes' },
  { topic: '03-styling', name: 'advanced-animations', title: 'Advanced React Animations', type: 'complete-missing', difficulty: 'advanced', time: '30-35 minutes', deps: ['framer-motion'] },

  // State Patterns (10 exercises)
  { topic: '04-state-patterns', name: 'prop-drilling-problem', title: 'Understanding Prop Drilling', type: 'fix-broken', difficulty: 'beginner', time: '15-20 minutes' },
  { topic: '04-state-patterns', name: 'context-api-basics', title: 'Context API Fundamentals', type: 'build-from-scratch', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '04-state-patterns', name: 'context-with-reducer', title: 'Context with useReducer', type: 'complete-missing', difficulty: 'intermediate', time: '30-35 minutes' },
  { topic: '04-state-patterns', name: 'compound-components', title: 'Compound Component Pattern', type: 'build-from-scratch', difficulty: 'advanced', time: '30-35 minutes' },
  { topic: '04-state-patterns', name: 'render-props-pattern', title: 'Render Props Pattern', type: 'complete-missing', difficulty: 'advanced', time: '25-30 minutes' },
  { topic: '04-state-patterns', name: 'data-fetching-useeffect', title: 'Data Fetching Patterns', type: 'build-from-scratch', difficulty: 'intermediate', time: '30-35 minutes' },
  { topic: '04-state-patterns', name: 'optimistic-updates', title: 'Optimistic UI Updates', type: 'complete-missing', difficulty: 'advanced', time: '30-35 minutes' },
  { topic: '04-state-patterns', name: 'state-machine-pattern', title: 'State Machine Pattern', type: 'build-from-scratch', difficulty: 'advanced', time: '35-40 minutes', deps: ['xstate'] },
  { topic: '04-state-patterns', name: 'data-fetching-swr', title: 'SWR for Data Fetching', type: 'complete-missing', difficulty: 'intermediate', time: '25-30 minutes', deps: ['swr'] },
  { topic: '04-state-patterns', name: 'state-colocation', title: 'State Colocation and Lifting', type: 'fix-broken', difficulty: 'advanced', time: '30-35 minutes' },

  // Performance (10 exercises)
  { topic: '05-performance', name: 'understanding-rerenders', title: 'Understanding Component Re-renders', type: 'build-from-scratch', difficulty: 'beginner', time: '20-25 minutes' },
  { topic: '05-performance', name: 'react-memo-basics', title: 'React.memo for Component Memoization', type: 'fix-broken', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '05-performance', name: 'usememo-basics', title: 'useMemo for Expensive Calculations', type: 'complete-missing', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '05-performance', name: 'usecallback-basics', title: 'useCallback for Function Memoization', type: 'build-from-scratch', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '05-performance', name: 'memoization-patterns', title: 'Combined Memoization Patterns', type: 'fix-broken', difficulty: 'advanced', time: '30-35 minutes' },
  { topic: '05-performance', name: 'code-splitting-basics', title: 'Code Splitting with React.lazy', type: 'build-from-scratch', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '05-performance', name: 'lazy-loading-images', title: 'Lazy Loading Images and Content', type: 'complete-missing', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '05-performance', name: 'virtualization', title: 'List Virtualization with react-window', type: 'build-from-scratch', difficulty: 'advanced', time: '30-35 minutes', deps: ['react-window', '@types/react-window'] },
  { topic: '05-performance', name: 'debouncing-throttling', title: 'Debouncing and Throttling', type: 'complete-missing', difficulty: 'intermediate', time: '25-30 minutes' },
  { topic: '05-performance', name: 'performance-audit', title: 'Complete Performance Audit', type: 'fix-broken', difficulty: 'advanced', time: '35-40 minutes' },
]

async function createExercise(exercise) {
  try {
    // Find next exercise number in topic
    const topicPath = path.join(rootDir, 'exercises', exercise.topic)
    const existingExercises = await fs.readdir(topicPath).catch(() => [])
    const numbers = existingExercises
      .map((dir) => parseInt(dir.split('-')[0]))
      .filter((n) => !isNaN(n))
    const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1
    const paddedNumber = String(nextNumber).padStart(2, '0')

    const exerciseName = `${paddedNumber}-${exercise.name}`
    const exercisePath = path.join(topicPath, exerciseName)

    // Check if exists
    try {
      await fs.access(exercisePath)
      console.log(chalk.yellow(`⚠️  Exercise already exists, skipping: ${exerciseName}`))
      return { success: true, skipped: true, name: exerciseName }
    } catch {
      // Doesn't exist, proceed
    }

    // Copy template
    const templatePath = path.join(rootDir, 'templates', exercise.type)
    await fs.cp(templatePath, exercisePath, { recursive: true })

    // Update package.json
    const packageJsonPath = path.join(exercisePath, 'package.json')
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    packageJson.name = `@react-learning/${exerciseName}`

    // Add dependencies if specified
    if (exercise.deps && exercise.deps.length > 0) {
      if (!packageJson.dependencies) packageJson.dependencies = {}
      for (const dep of exercise.deps) {
        // Add with latest version placeholder - will be resolved on install
        if (dep.startsWith('@types/')) {
          if (!packageJson.devDependencies) packageJson.devDependencies = {}
          packageJson.devDependencies[dep] = '^18.0.0'
        } else if (dep === 'styled-components') {
          packageJson.dependencies[dep] = '^6.1.8'
        } else if (dep === 'tailwindcss') {
          packageJson.devDependencies[dep] = '^3.4.1'
        } else if (dep === 'autoprefixer') {
          packageJson.devDependencies[dep] = '^10.4.17'
        } else if (dep === 'postcss') {
          packageJson.devDependencies[dep] = '^8.4.35'
        } else if (dep === 'clsx') {
          packageJson.dependencies[dep] = '^2.1.0'
        } else if (dep === 'framer-motion') {
          packageJson.dependencies[dep] = '^11.0.3'
        } else if (dep === 'xstate') {
          packageJson.dependencies[dep] = '^5.7.0'
        } else if (dep === 'swr') {
          packageJson.dependencies[dep] = '^2.2.4'
        } else if (dep === 'react-window') {
          packageJson.dependencies[dep] = '^1.8.10'
        } else {
          packageJson.dependencies[dep] = 'latest'
        }
      }
    }

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

    // Update README.md
    const readmePath = path.join(exercisePath, 'README.md')
    let readme = await fs.readFile(readmePath, 'utf-8')
    readme = readme
      .replace(/EXERCISE_TITLE/g, exercise.title)
      .replace(/DIFFICULTY_LEVEL/g, exercise.difficulty)
      .replace(/ESTIMATED_TIME/g, exercise.time)
    await fs.writeFile(readmePath, readme)

    // Update SOLUTION.md if it exists
    const solutionPath = path.join(exercisePath, 'SOLUTION.md')
    try {
      let solution = await fs.readFile(solutionPath, 'utf-8')
      solution = solution.replace(/EXERCISE_TITLE/g, exercise.title)
      await fs.writeFile(solutionPath, solution)
    } catch {
      // SOLUTION.md doesn't exist in all templates
    }

    console.log(chalk.green(`✅ Created: ${chalk.bold(exerciseName)}`))
    return { success: true, skipped: false, name: exerciseName }
  } catch (error) {
    console.error(chalk.red(`❌ Failed to create ${exercise.name}:`), error.message)
    return { success: false, name: exercise.name, error: error.message }
  }
}

async function main() {
  console.log(chalk.blue.bold('\n🚀 Batch Creating 48 React Exercises\n'))

  const results = []

  for (const exercise of exercises) {
    const result = await createExercise(exercise)
    results.push(result)
  }

  // Summary
  console.log(chalk.blue.bold('\n📊 Summary:\n'))
  const successful = results.filter(r => r.success && !r.skipped).length
  const skipped = results.filter(r => r.skipped).length
  const failed = results.filter(r => !r.success).length

  console.log(chalk.green(`✅ Successfully created: ${successful}`))
  if (skipped > 0) {
    console.log(chalk.yellow(`⚠️  Skipped (already exist): ${skipped}`))
  }
  if (failed > 0) {
    console.log(chalk.red(`❌ Failed: ${failed}`))
    results.filter(r => !r.success).forEach(r => {
      console.log(chalk.red(`   - ${r.name}: ${r.error}`))
    })
  }

  console.log(chalk.blue('\n📝 Next steps:'))
  console.log(chalk.gray('   1. Review each exercise directory'))
  console.log(chalk.gray('   2. Implement starter code in src/App.tsx'))
  console.log(chalk.gray('   3. Write comprehensive tests in src/App.test.tsx'))
  console.log(chalk.gray('   4. Complete README.md with detailed instructions'))
  console.log(chalk.gray('   5. Write full solution in SOLUTION.md\n'))
}

main().catch((err) => {
  console.error(chalk.red('\n❌ Error:'), err.message)
  process.exit(1)
})
