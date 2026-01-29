# React Learning Repository

A progressive practice environment for improving React, JavaScript, HTML, and CSS skills through hands-on exercises with automated testing.

## Overview

This repository contains structured exercises organized by topic and difficulty level. Each exercise includes:
- Clear instructions and learning objectives
- Starter code appropriate to the exercise type
- Comprehensive tests to verify your solution
- Hints and solutions

## Exercise Types

### 🔧 Fix Broken Code
Debug and fix intentionally broken code. Great for learning common pitfalls and best practices.

### ✏️ Complete Missing Parts
Fill in TODO comments and implement missing functionality. Guided practice with structured learning.

### 🚀 Build From Scratch
Implement features based on requirements and tests. Maximum creativity and problem-solving.

## Topics Covered

### 50 Comprehensive Exercises Across 5 Sections

- **01-fundamentals**: React basics (components, props, state, events, lists) - 10 exercises
- **02-hooks**: Hook patterns (useState, useEffect, useRef, custom hooks) - 10 exercises
- **03-styling**: CSS approaches (modules, styled-components, Tailwind, animations) - 10 exercises
- **04-state-patterns**: Advanced patterns (Context, reducers, data fetching) - 10 exercises
- **05-performance**: Optimization (memoization, lazy loading, profiling) - 10 exercises

<details>
<summary>📋 View Complete Exercise List</summary>

### 01-fundamentals (Beginner → Advanced)
1. **Hello Component** - Build first component
2. **Broken Counter** - Fix state bugs
3. **Props and Prop Types** - TypeScript props
4. **Conditional Rendering** - Render patterns
5. **Lists and Keys** - Fix key bugs
6. **Form Inputs** - Controlled components
7. **Component Composition** - Children prop
8. **Event Handling** - Fix event bugs
9. **Lifting State Up** - Shared state
10. **Multi-Step Form** - Complex workflow

### 02-hooks (Beginner → Advanced)
1. **useState Basics** - Counter
2. **useState with Objects** - Profile editor
3. **useState with Arrays** - Shopping cart bugs
4. **useEffect Basics** - Lifecycle
5. **useEffect Data Fetching** - API calls
6. **Custom Hooks Basic** - useToggle, useLocalStorage
7. **Custom Hooks Advanced** - useFetch, useDebounce
8. **useReducer Basics** - Complex form
9. **useReducer Advanced** - Cart reducer bugs
10. **useContext Global State** - Theme provider

### 03-styling (Beginner → Advanced)
1. **CSS Basics** - Traditional styling
2. **CSS Modules** - Scoped styles
3. **CSS Modules Advanced** - Theming
4. **Styled Components Intro** - CSS-in-JS basics
5. **Styled Components Theming** - Theme provider
6. **Tailwind Basics** - Fix utility classes
7. **Tailwind Components** - Button variants
8. **Responsive Design** - Grid & Flexbox
9. **CSS Animations** - Transitions & keyframes
10. **Advanced Animations** - Framer Motion

### 04-state-patterns (Intermediate → Advanced)
1. **Prop Drilling Problem** - Experience the issue
2. **Context API Basics** - Solve prop drilling
3. **Context with Reducer** - Shopping cart
4. **Compound Components** - Select component
5. **Render Props Pattern** - Logic sharing
6. **Data Fetching useEffect** - Pagination & search
7. **Optimistic Updates** - Instant UI feedback
8. **State Machine Pattern** - XState checkout
9. **Data Fetching SWR** - Smart caching
10. **State Colocation** - Fix over-abstraction

### 05-performance (Intermediate → Advanced)
1. **Understanding Re-renders** - Visualization
2. **React.memo Basics** - Fix unnecessary renders
3. **useMemo Basics** - Cache calculations
4. **useCallback Basics** - Stabilize callbacks
5. **Memoization Patterns** - When to memoize
6. **Code Splitting Basics** - React.lazy
7. **Lazy Loading Images** - Intersection Observer
8. **Virtualization** - 10k item list
9. **Debouncing & Throttling** - Reduce operations
10. **Performance Audit** - Fix multiple issues

</details>

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/UniqueClone/react-learning.git
cd react-learning

# Install dependencies
pnpm install
```

## Working on Exercises

### Method 1: Interactive Menu (Recommended)

```bash
# Start the interactive exercise selector
pnpm dev
```

This will show you a menu of all available exercises. Select one to start the dev server.

### Method 2: Direct Navigation

```bash
# Navigate to an exercise
cd exercises/01-fundamentals/01-hello-component

# Install dependencies (first time only)
pnpm install

# Start the dev server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Exercise Workflow

1. **Read the README** - Each exercise has instructions, requirements, and learning objectives
2. **Run the dev server** - See your changes live with `pnpm dev`
3. **Write code** - Implement your solution in `src/App.tsx`
4. **Run tests** - Verify with `pnpm test`
5. **Check hints** - Stuck? Expand the hint sections in the README
6. **Review solution** - After attempting, check `SOLUTION.md` for the complete solution and explanation

## Available Commands

### Root Level

```bash
pnpm dev           # Interactive exercise selector
pnpm test:all      # Run tests for all exercises
pnpm create        # Create a new exercise
pnpm validate      # Validate exercise structure
```

### Exercise Level

```bash
pnpm dev           # Start Vite dev server
pnpm test          # Run tests once
pnpm test:watch    # Run tests in watch mode
pnpm build         # Build for production
```

## Repository Structure

```
react-learning/
├── exercises/              # All exercises organized by topic
│   ├── 01-fundamentals/
│   ├── 02-hooks/
│   ├── 03-styling/
│   ├── 04-state-patterns/
│   └── 05-performance/
├── templates/              # Templates for creating new exercises
├── scripts/                # CLI tools and utilities
├── shared/                 # Shared utilities and types
└── docs/                   # Additional documentation
```

## Creating New Exercises

Want to add your own exercises?

```bash
pnpm create
```

Follow the prompts to scaffold a new exercise from a template. See [docs/creating-exercises.md](docs/creating-exercises.md) for details.

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **pnpm** - Fast, efficient package manager

## Learning Path

### Beginners
Start with `01-fundamentals` and work through each exercise sequentially.

### Intermediate
Feel free to skip to `02-hooks` or `03-styling` based on your interests.

### Advanced
Jump to `04-state-patterns` or `05-performance` for challenging exercises.

## Tips for Success

1. **Don't peek at solutions too early** - Struggle is part of learning
2. **Read the tests** - They define the expected behavior
3. **Use the dev server** - See your changes in real-time
4. **Experiment** - Break things, fix them, learn
5. **Read error messages** - They're trying to help you
6. **Use hints progressively** - Try without hints first
7. **Review solutions** - Even if you solved it, there might be a better approach

## Contributing

Want to contribute exercises? See [docs/creating-exercises.md](docs/creating-exercises.md) for guidelines.

## License

GPL-3.0 - See LICENSE file for details.

## Acknowledgments

Built with modern web development tools and best practices to provide an effective learning environment.

---

Happy learning! 🎓

For detailed getting started instructions, see [docs/getting-started.md](docs/getting-started.md)
