# Getting Started with React Learning

This guide will help you set up your environment and start working on exercises.

## Installation

### 1. Install Prerequisites

#### Node.js
Download and install Node.js 18 or higher from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version  # Should be 18.0.0 or higher
```

#### pnpm
Install pnpm globally:
```bash
npm install -g pnpm
```

Verify installation:
```bash
pnpm --version
```

### 2. Clone the Repository

```bash
git clone https://github.com/UniqueClone/react-learning.git
cd react-learning
```

### 3. Install Dependencies

From the root directory:
```bash
pnpm install
```

This will install dependencies for the root workspace and all exercises.

## Your First Exercise

Let's walk through completing your first exercise.

### Step 1: Select an Exercise

```bash
pnpm dev
```

This opens an interactive menu. Use arrow keys to select **01-fundamentals/01-hello-component** and press Enter.

Alternatively, navigate directly:
```bash
cd exercises/01-fundamentals/01-hello-component
pnpm dev
```

### Step 2: Read the Instructions

Open `README.md` in the exercise directory. It contains:
- Problem description
- Requirements
- Learning objectives
- Hints

### Step 3: Look at the Tests

Open `src/App.test.tsx` to see what your code needs to do. Tests define the expected behavior.

### Step 4: Implement Your Solution

Edit `src/App.tsx` to implement the solution.

For the hello-component exercise, you need to:
- Display "Hello, React!" in a heading
- Show a welcome message
- Display the current date

### Step 5: Check Your Work

Run the tests:
```bash
pnpm test
```

If tests fail, read the error messages carefully. They tell you what's wrong.

### Step 6: Use Hints If Needed

If you're stuck, expand the hint sections in the README.md file. They're hidden by default so you can try without them first.

### Step 7: Review the Solution

After you've completed the exercise (or given it a good try), check `SOLUTION.md` for:
- Explanation of the correct approach
- Complete working code
- Key takeaways

## Working on More Exercises

### Exercise Types

#### Fix Broken Code
- Code has intentional bugs
- Tests fail initially
- Your job: debug and fix

**Workflow:**
1. Run `pnpm dev` to see the broken behavior
2. Run `pnpm test` to see failing tests
3. Fix bugs in `src/App.tsx`
4. Re-run tests until they pass

#### Complete Missing Parts
- Code has TODO comments
- Functions are empty
- Your job: fill in the blanks

**Workflow:**
1. Find all TODO comments
2. Implement the missing functionality
3. Run `pnpm test` to verify
4. Run `pnpm dev` to test manually

#### Build From Scratch
- Minimal starter code
- Requirements in README
- Your job: implement from scratch

**Workflow:**
1. Read requirements carefully
2. Check tests for expected behavior
3. Design your approach
4. Implement your solution
5. Verify with tests

## Common Commands

### Root Directory

```bash
pnpm dev          # Interactive exercise selector
pnpm test:all     # Run all tests (see which exercises you've completed)
pnpm create       # Create a new exercise
pnpm validate     # Check all exercises have proper structure
```

### Exercise Directory

```bash
pnpm dev          # Start development server
pnpm test         # Run tests once
pnpm test:watch   # Run tests continuously (great for TDD)
pnpm build        # Build for production (not usually needed)
```

## IDE Setup

### VS Code (Recommended)

Install these extensions:
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Vitest** - Test runner integration
- **Error Lens** - Inline error messages

### Other IDEs

The repository uses standard TypeScript and React tooling, so any modern IDE should work fine.

## Troubleshooting

### Tests Won't Run

**Problem:** `pnpm test` throws errors

**Solutions:**
1. Make sure you've run `pnpm install` in the exercise directory
2. Check that `node_modules` exists
3. Try deleting `node_modules` and running `pnpm install` again

### Dev Server Won't Start

**Problem:** `pnpm dev` fails

**Solutions:**
1. Check if another dev server is already running on port 5173
2. Kill other Vite processes
3. Try running on a different port: `pnpm dev -- --port 3000`

### TypeScript Errors

**Problem:** Red squiggly lines everywhere

**Solutions:**
1. Make sure your IDE has TypeScript support enabled
2. Reload your IDE window
3. Run `pnpm install` to ensure types are installed

### Import Errors

**Problem:** Can't import React or other modules

**Solutions:**
1. Verify `node_modules` exists in the exercise directory
2. Run `pnpm install`
3. Check that the import statement is correct

## Tips for Success

### 1. Test-Driven Development

Run tests in watch mode while you code:
```bash
pnpm test:watch
```

This gives you instant feedback as you make changes.

### 2. Read Error Messages

When tests fail or you get TypeScript errors, read the messages carefully. They usually tell you exactly what's wrong.

### 3. Use the Browser

The dev server shows your component in a browser. Use browser dev tools to:
- Inspect elements
- Check console for errors
- Debug with breakpoints

### 4. Commit Your Solutions

Create a branch for your work:
```bash
git checkout -b my-solutions
git add .
git commit -m "Complete hello-component exercise"
```

This lets you track your progress and revert if needed.

### 5. Take Breaks

If you're stuck, take a break. Sometimes the solution comes when you're not actively thinking about it.

### 6. Pair Program

Learning with a friend? Try pair programming:
- One person writes code
- Other person reviews and suggests
- Switch roles regularly

### 7. Ask for Help

Stuck on an exercise?
- Re-read the requirements
- Check the hints
- Review the learning objectives
- Look at the tests again
- Check the solution (but try hard first!)

## Next Steps

1. Complete all exercises in `01-fundamentals`
2. Move on to `02-hooks` when ready
3. Experiment with different styling approaches in `03-styling`
4. Challenge yourself with `04-state-patterns` and `05-performance`
5. Create your own exercises with `pnpm create`

## Learning Resources

### React Documentation
- [React Docs](https://react.dev/) - Official React documentation
- [React Beta Docs](https://react.dev/learn) - New learning-focused docs

### Testing
- [React Testing Library](https://testing-library.com/react) - Testing best practices
- [Vitest](https://vitest.dev/) - Test framework documentation

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Official guide
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - React-specific TypeScript patterns

---

Ready to start learning? Run `pnpm dev` and select your first exercise!
