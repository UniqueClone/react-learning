# State Patterns Exercises

A comprehensive collection of 10 exercises covering React state management patterns, from basic prop drilling to advanced state machines.

## Exercise Overview

| # | Name | Type | Difficulty | Time | Status |
|---|------|------|------------|------|--------|
| 01 | Prop Drilling Problem | Fix Broken | Beginner | 15-20min | ✅ Complete |
| 02 | Context API Basics | Build | Intermediate | 25-30min | ✅ Complete |
| 03 | Context with Reducer | Complete | Intermediate | 30-35min | ⚠️ Partial |
| 04 | Compound Components | Build | Advanced | 30-35min | 📝 TODO |
| 05 | Render Props Pattern | Complete | Advanced | 25-30min | 📝 TODO |
| 06 | Data Fetching useEffect | Build | Intermediate | 30-35min | 📝 TODO |
| 07 | Optimistic Updates | Complete | Advanced | 30-35min | 📝 TODO |
| 08 | State Machine Pattern | Build | Advanced | 35-40min | 📝 TODO |
| 09 | Data Fetching SWR | Complete | Intermediate | 25-30min | 📝 TODO |
| 10 | State Colocation | Fix Broken | Advanced | 30-35min | 📝 TODO |

**Total Time:** 4.5-5.5 hours for all exercises

## Completed Exercises

### ✅ Exercise 01: Prop Drilling Problem
**Status:** Fully implemented
**Files:** README, App.tsx, App.test.tsx (8 tests), index.css, SOLUTION.md

Demonstrates the prop drilling anti-pattern with 6 levels of nested components. Students experience the maintenance problems firsthand before learning about Context API in the next exercise.

**Key Learning:**
- Identify prop drilling code smell
- Understand tight coupling issues
- Prepare for Context API solution

### ✅ Exercise 02: Context API Basics
**Status:** Fully implemented  
**Files:** README, App.tsx (starter with TODOs), App.test.tsx (8 tests), index.css, SOLUTION.md

Build an authentication system using Context API. Students create UserContext, custom hooks, and eliminate prop drilling from Exercise 01.

**Key Learning:**
- createContext, Provider, useContext
- Custom hook pattern for contexts
- When to use Context vs props
- TypeScript with Context API

## In Progress Exercises

### ⚠️ Exercise 03: Context with Reducer
**Status:** Partial implementation
**Completed:** README.md, src/App.tsx (starter with TODOs)
**Remaining:** App.test.tsx, index.css, SOLUTION.md

Shopping cart system combining Context + useReducer. Students complete the reducer logic and wire up the cart operations.

**Key Learning:**
- Context + useReducer pattern
- Reducer for complex state logic
- Split contexts for performance
- Cart operations (add, remove, update quantity)

## TODO Exercises

### Exercise 04: Compound Components
Advanced pattern for building flexible, composable component APIs. Students build a Select component with Option and OptionGroup subcomponents that share implicit state.

### Exercise 05: Render Props Pattern
Learn the render props pattern through MouseTracker and Toggle components. Compare with custom hooks approach.

### Exercise 06: Data Fetching with useEffect
Master async operations, pagination, search, filtering, and proper cleanup. Handle loading states, errors, and race conditions.

### Exercise 07: Optimistic Updates
Build a Todo app with optimistic UI updates. Immediately reflect changes in UI, sync with backend, and handle rollback on failures.

### Exercise 08: State Machine Pattern  
Multi-step checkout flow using XState. Define states, transitions, and guards for predictable state management.

### Exercise 09: Data Fetching with SWR
Dashboard using SWR library for data fetching. Learn caching, revalidation, and real-time features.

### Exercise 10: State Colocation
Fix an over-abstracted app with too much global state. Learn when to lift state vs keep it local for better performance.

## How to Use These Exercises

### For Students

1. **Start with Exercise 01** - Even if you know Context, seeing the problem helps appreciate the solution
2. **Follow the order** - Each builds on previous concepts
3. **Read README first** - Understand requirements before looking at tests
4. **Try without hints** - Hints are there if you're stuck
5. **Check tests frequently** - Use TDD approach when possible
6. **Study the solution** - Even if your code works, compare approaches

### Running an Exercise

```bash
# Navigate to exercise directory
cd exercises/04-state-patterns/01-prop-drilling-problem

# Install dependencies (if not already done)
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Exercise Types

**Fix Broken (Red):** Code works but has problems. Identify and fix issues.
- Example: Exercise 01, 10

**Build From Scratch (Green):** Minimal starter. Build from requirements and tests.
- Example: Exercise 02, 04, 06, 08

**Complete Missing (Yellow):** Partial code with TODOs. Fill in the gaps.
- Example: Exercise 03, 05, 07, 09

## Learning Path

### Beginner Path (3-4 hours)
1. Exercise 01 - Prop Drilling Problem
2. Exercise 02 - Context API Basics
3. Exercise 03 - Context with Reducer
4. Exercise 06 - Data Fetching useEffect

### Intermediate Path (4-5 hours)
All beginner exercises, plus:
5. Exercise 09 - Data Fetching SWR
6. Exercise 05 - Render Props Pattern
7. Exercise 10 - State Colocation

### Advanced Path (5-6 hours)
All exercises including:
8. Exercise 04 - Compound Components
9. Exercise 07 - Optimistic Updates
10. Exercise 08 - State Machine Pattern

## Technologies Used

- **React 18.3+** - Latest React with hooks
- **TypeScript 5.3+** - Type safety throughout
- **Vitest** - Fast unit testing
- **Testing Library** - User-centric testing
- **Vite** - Lightning-fast dev server
- **XState** - State machines (Exercise 08)
- **SWR** - Data fetching library (Exercise 09)

## Concepts Covered

### State Management Patterns
- Context API
- useReducer
- Compound Components
- Render Props
- State Machines
- State Colocation

### React Patterns
- Custom Hooks
- Provider Pattern
- Composition
- Children as Function
- Separation of Concerns

### Best Practices
- TypeScript with React
- Testing strategies
- Performance optimization
- Error handling
- Cleanup and memory leaks

## Implementation Status

### Completed (2/10)
✅ Exercise 01 - Prop Drilling Problem
✅ Exercise 02 - Context API Basics

### In Progress (1/10)
⚠️ Exercise 03 - Context with Reducer (70% complete)

### Remaining (7/10)
Each needs: README, App.tsx, App.test.tsx, index.css, SOLUTION.md

Estimated time to complete: **~7.5 hours**

See `IMPLEMENTATION_GUIDE.md` for detailed completion checklist.

## Additional Resources

- **STATE_PATTERNS_IMPLEMENTATION_SUMMARY.md** - Detailed status of all exercises
- **IMPLEMENTATION_GUIDE.md** - Step-by-step guide to complete remaining exercises
- Individual exercise READMEs - Specific requirements and hints
- Individual exercise SOLUTIONs - Complete implementations with explanations

## Contributing

When completing remaining exercises:
1. Follow existing patterns from exercises 01-02
2. Use TypeScript with proper types
3. Write comprehensive tests (6-10 per exercise)
4. Include detailed SOLUTION.md with explanations
5. Use modern, clean CSS styling
6. Add helpful hints in README

## License

GPL-3.0 - See repository root for details
