# Conditional Rendering Patterns

**Difficulty:** beginner
**Type:** Build From Scratch
**Estimated Time:** 20-25 minutes

## Challenge

Build a user profile card component that conditionally displays different content based on user status (logged in/out, premium/free, verified/unverified). Practice various conditional rendering techniques including ternary operators, logical AND operators, and early returns.

## Requirements

Your implementation must:
- Create a `UserCard` component that accepts user data as props
- Display user name prominently
- Show "Logged In" or "Guest" status based on `isLoggedIn` boolean
- Display a premium badge only if `isPremium` is true
- Show a verified checkmark only if `isVerified` is true
- Render at least 3 different user cards with varying statuses

## Learning Objectives

- Master different conditional rendering patterns in React
- Use ternary operators for either/or conditions
- Use logical AND (`&&`) for conditional content
- Understand when to use early returns
- Practice building reusable components

## Instructions

1. Run `pnpm install` to install dependencies
2. Open [src/App.tsx](src/App.tsx)
3. Define a `User` type or interface with the necessary properties
4. Create a `UserCard` component that accepts a user object
5. Implement conditional rendering for different user states
6. Render multiple `UserCard` components with different prop combinations
7. Run `pnpm dev` to see your implementation
8. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] At least 3 user cards are displayed
- [ ] Logged-in vs logged-out status is clearly shown
- [ ] Premium badge appears only for premium users
- [ ] Verified badge appears only for verified users
- [ ] Code uses multiple conditional rendering patterns (ternary, &&, etc.)
- [ ] All tests pass

## Hints

<details>
<summary>What conditional rendering patterns should I use?</summary>

**Ternary Operator** - For either/or conditions:
```typescript
{isLoggedIn ? <span>Logged In</span> : <span>Guest</span>}
```

**Logical AND** - For optional content:
```typescript
{isPremium && <span className="badge">Premium</span>}
```

</details>

<details>
<summary>How do I structure the User type?</summary>

Consider what properties you need:
```typescript
interface User {
  name: string
  isLoggedIn: boolean
  isPremium: boolean
  isVerified: boolean
}
```

</details>

<details>
<summary>How should I style the badges?</summary>

You can use inline styles or className:
```typescript
<span style={{ color: 'gold' }}>⭐ Premium</span>
<span className="verified">✓ Verified</span>
```

</details>

## Testing

Run `pnpm test` to verify your implementation. The tests check that:
- Multiple user cards are rendered
- Logged-in and guest statuses are displayed
- Premium badges appear conditionally
- Verified badges appear conditionally

## Solution

When you're done or need help, check [SOLUTION.md](SOLUTION.md) for a complete implementation.
