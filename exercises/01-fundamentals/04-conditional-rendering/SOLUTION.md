# Solution: Conditional Rendering Patterns

## Complete Solution

```typescript
interface User {
  name: string
  isLoggedIn: boolean
  isPremium: boolean
  isVerified: boolean
}

interface UserCardProps {
  user: User
}

function UserCard({ user }: UserCardProps) {
  return (
    <div style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '16px', margin: '16px 0', maxWidth: '300px' }}>
      <h2>{user.name}</h2>

      {/* Ternary operator for either/or condition */}
      <p>
        Status: {user.isLoggedIn ? (
          <span style={{ color: 'green' }}>✓ Logged In</span>
        ) : (
          <span style={{ color: 'gray' }}>Guest</span>
        )}
      </p>

      {/* Logical AND for conditional rendering */}
      {user.isPremium && (
        <span style={{ background: 'gold', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          ⭐ PREMIUM
        </span>
      )}

      {user.isVerified && (
        <span style={{ color: 'blue', marginLeft: '8px', fontSize: '14px' }}>
          ✓ Verified
        </span>
      )}
    </div>
  )
}

export default function App() {
  const users: User[] = [
    { name: 'Alice', isLoggedIn: true, isPremium: true, isVerified: true },
    { name: 'Bob', isLoggedIn: false, isPremium: false, isVerified: false },
    { name: 'Charlie', isLoggedIn: true, isPremium: false, isVerified: false },
  ]

  return (
    <div style={{ padding: '20px' }}>
      <h1>Conditional Rendering Patterns</h1>
      {users.map((user) => (
        <UserCard key={user.name} user={user} />
      ))}
    </div>
  )
}
```

## Key Concepts

### 1. Ternary Operator (Either/Or)

```typescript
{user.isLoggedIn ? <span>✓ Logged In</span> : <span>Guest</span>}
```

**When to use:** When you have exactly two possible outcomes.

### 2. Logical AND (Optional Content)

```typescript
{user.isPremium && <span>⭐ PREMIUM</span>}
```

**When to use:** When content should either display or not display. Nothing renders if condition is false.

**How it works:**
- JavaScript evaluates left to right
- If left side is falsy, returns that value (React renders nothing)
- If left side is truthy, evaluates right side

### 3. Common Patterns

**Multiple conditions:**
```typescript
{user.isLoggedIn && user.isPremium && <GoldBadge />}
```

**Nested ternary (use sparingly):**
```typescript
{user.isPremium ? <PremiumBadge /> : user.isVerified ? <VerifiedBadge /> : null}
```

**Variable assignment (more readable):**
```typescript
let badge
if (user.isPremium) badge = <PremiumBadge />
else if (user.isVerified) badge = <VerifiedBadge />
return <div>{badge}</div>
```

## Common Mistakes

### ❌ Using && with numbers
```typescript
{count && <div>Count: {count}</div>}
// If count is 0, React renders "0"!
```

### ✅ Correct
```typescript
{count > 0 && <div>Count: {count}</div>}
```

---

### ❌ Complex nested ternaries
```typescript
{isLoading ? <Spinner /> : hasError ? <Error /> : isEmpty ? <Empty /> : <Content />}
```

### ✅ Correct
```typescript
const getContent = () => {
  if (isLoading) return <Spinner />
  if (hasError) return <Error />
  if (isEmpty) return <Empty />
  return <Content />
}
return <div>{getContent()}</div>
```

## Key Takeaways

1. **Choose the right pattern** for the situation
2. **Ternary operators** are great for either/or, but don't nest them deeply
3. **Logical AND (`&&`)** is perfect for optional content
4. **Be careful with falsy values** (0, "", null, undefined) - they might render unexpectedly
5. **Extract complex logic** into functions or variables for readability

## Further Practice

- Add more status types (pending, active, suspended)
- Create a loading state
- Implement error boundaries
- Add theme toggle for different styles
