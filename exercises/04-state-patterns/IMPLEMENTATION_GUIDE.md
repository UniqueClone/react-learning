# State Patterns - Remaining Implementation Guide

## Status: 2 of 10 Exercises Complete

### ✅ COMPLETED
1. **01-prop-drilling-problem** - Fully implemented with all files
2. **02-context-api-basics** - Fully implemented with all files

### ⚠️ IN PROGRESS
3. **03-context-with-reducer** - Partial (README ✓, App.tsx starter ✓, needs tests/CSS/solution)

### 📋 TODO (Exercises 04-10)
4. **04-compound-components**
5. **05-render-props-pattern**
6. **06-data-fetching-useeffect**
7. **07-optimistic-updates**
8. **08-state-machine-pattern** (requires XState in package.json)
9. **09-data-fetching-swr** (requires SWR in package.json)
10. **10-state-colocation**

## Quick Implementation Checklist

Each exercise requires these 5 files:

### Exercise 03: Context with Reducer
- [x] README.md
- [x] src/App.tsx (starter with TODOs)
- [ ] src/App.test.tsx (10 tests)
- [ ] src/index.css
- [ ] SOLUTION.md

### Exercise 04: Compound Components
- [ ] README.md
- [ ] src/App.tsx (minimal starter)
- [ ] src/App.test.tsx (8 tests)
- [ ] src/index.css
- [ ] SOLUTION.md

### Exercise 05: Render Props Pattern
- [ ] README.md
- [ ] src/App.tsx (partial with TODOs)
- [ ] src/App.test.tsx (8 tests)
- [ ] src/index.css
- [ ] SOLUTION.md

### Exercise 06: Data Fetching useEffect
- [ ] README.md
- [ ] src/App.tsx (minimal starter)
- [ ] src/App.test.tsx (10 tests)
- [ ] src/index.css
- [ ] SOLUTION.md

### Exercise 07: Optimistic Updates
- [ ] README.md
- [ ] src/App.tsx (partial with TODOs)
- [ ] src/App.test.tsx (8 tests)
- [ ] src/index.css
- [ ] SOLUTION.md

### Exercise 08: State Machine Pattern
- [ ] package.json (add xstate dependency)
- [ ] README.md
- [ ] src/App.tsx (minimal starter)
- [ ] src/App.test.tsx (10 tests)
- [ ] src/index.css
- [ ] SOLUTION.md

### Exercise 09: Data Fetching SWR
- [ ] package.json (add swr dependency)
- [ ] README.md
- [ ] src/App.tsx (partial with TODOs)
- [ ] src/App.test.tsx (8 tests)
- [ ] src/index.css
- [ ] SOLUTION.md

### Exercise 10: State Colocation
- [ ] README.md
- [ ] src/App.tsx (buggy code with performance issues)
- [ ] src/App.test.tsx (8 tests including performance)
- [ ] src/index.css
- [ ] SOLUTION.md

## File Templates to Use

### README.md Pattern
- Title with difficulty, type, time estimate
- Challenge description
- Requirements (bullet points)
- Learning objectives
- Instructions (numbered)
- Acceptance criteria (checkboxes)
- 2-3 hints in collapsible sections
- Link to SOLUTION.md

### App.tsx Patterns
- **Build from scratch**: Minimal starter with comments
- **Complete missing**: Partial code with TODO comments
- **Fix broken**: Working but problematic code

### App.test.tsx Pattern
- Import describe, it, expect from vitest
- Import render, screen, waitFor from @testing-library/react
- Import userEvent if needed
- 6-10 tests covering main functionality
- Use data-testid for specific elements
- Test happy path and edge cases

### index.css Pattern
- Modern, clean styling
- CSS variables for colors
- Responsive layout
- Component-specific classes
- Professional appearance

### SOLUTION.md Pattern
- Complete working implementation
- Code with inline comments
- Explanation of key concepts (3-5 sections)
- When to use / when not to use
- Performance considerations
- Key takeaways (5 bullet points)
- Link to next exercise

## Estimated Time to Complete

- Exercise 03: 45 min (tests, CSS, solution)
- Exercise 04: 60 min (compound pattern is complex)
- Exercise 05: 45 min  
- Exercise 06: 60 min (async handling is detailed)
- Exercise 07: 60 min (optimistic UI is intricate)
- Exercise 08: 75 min (XState requires setup)
- Exercise 09: 45 min (SWR is straightforward)
- Exercise 10: 60 min (need broken + fixed versions)

**Total: ~7.5 hours of focused implementation**

## Priority Order

1. **Exercise 03** - Context+Reducer is foundational
2. **Exercise 06** - Data fetching is commonly needed
3. **Exercise 09** - SWR builds on Exercise 06
4. **Exercise 04** - Compound components for advanced patterns
5. **Exercise 05** - Render props for pattern comparison
6. **Exercise 07** - Optimistic UI for UX
7. **Exercise 08** - State machines for complex flows
8. **Exercise 10** - State colocation for architecture

## Quick Start Commands

To complete exercise 03:
```bash
cd exercises/04-state-patterns/03-context-with-reducer
# Create App.test.tsx with 10 tests
# Create index.css with cart styling
# Create SOLUTION.md with complete implementation
pnpm test
```

To start exercise 04:
```bash
cd exercises/04-state-patterns/04-compound-components
# Create all 5 files following the patterns above
pnpm test
```

## Notes

- All exercises use TypeScript with strict types
- Use modern React patterns (hooks, functional components)
- Tests should be comprehensive but realistic
- Solutions should be production-quality code
- Explanations should teach concepts, not just show code
