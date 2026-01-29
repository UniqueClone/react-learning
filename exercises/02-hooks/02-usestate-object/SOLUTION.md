# Solution: useState with Objects - User Profile Editor

## Complete Solution

```typescript
import { useState } from 'react'

interface Profile {
  name: string
  email: string
  age: number
  bio: string
}

export default function App() {
  const [profile, setProfile] = useState<Profile>({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    bio: 'Software developer'
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, name: e.target.value })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, email: e.target.value })
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, age: Number(e.target.value) })
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile({ ...profile, bio: e.target.value })
  }

  return (
    <div>
      <h1>User Profile Editor</h1>

      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={profile.name}
            onChange={handleNameChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={profile.email}
            onChange={handleEmailChange}
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            value={profile.age}
            onChange={handleAgeChange}
          />
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={profile.bio}
            onChange={handleBioChange}
          />
        </div>
      </form>

      <div>
        <h2>Current Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
      </div>
    </div>
  )
}
```

## Explanation

### 1. Defining the State Type

```typescript
interface Profile {
  name: string
  email: string
  age: number
  bio: string
}
```

TypeScript interface ensures type safety for the profile object.

### 2. Initializing Object State

```typescript
const [profile, setProfile] = useState<Profile>({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  bio: 'Software developer'
})
```

Pass an object as the initial value. The generic type `<Profile>` is optional but provides better type inference.

### 3. Immutable Updates with Spread Operator

```typescript
setProfile({ ...profile, name: e.target.value })
```

The key concept here:
- `...profile` creates a shallow copy of all properties
- `name: e.target.value` overrides just the name property
- Result is a new object (not mutating the original)

### 4. Controlled Inputs

```typescript
<input
  value={profile.name}
  onChange={handleNameChange}
/>
```

The input is "controlled" because:
- Its value comes from state (`value={profile.name}`)
- Changes update state via `onChange`
- React controls the input value, not the DOM

### 5. Type Conversion for Numbers

```typescript
setProfile({ ...profile, age: Number(e.target.value) })
```

Input values are always strings. Convert to number for the age field.

## Alternative: Generic Update Handler

You can reduce code duplication with a generic handler:

```typescript
const handleFieldChange = (field: keyof Profile) => {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === 'age' ? Number(e.target.value) : e.target.value
    setProfile({ ...profile, [field]: value })
  }
}

// Usage:
<input value={profile.name} onChange={handleFieldChange('name')} />
<input value={profile.email} onChange={handleFieldChange('email')} />
```

## Alternative: Single Handler with Computed Property

```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target
  setProfile({
    ...profile,
    [name]: type === 'number' ? Number(value) : value
  })
}

// Usage (note the name attribute):
<input name="name" value={profile.name} onChange={handleChange} />
<input name="email" value={profile.email} onChange={handleChange} />
```

## Why Immutability Matters

### WRONG - Direct Mutation:
```typescript
// This won't trigger a re-render!
profile.name = 'New Name'
setProfile(profile)  // Same object reference
```

### RIGHT - Create New Object:
```typescript
// This triggers a re-render
setProfile({ ...profile, name: 'New Name' })  // New object reference
```

React compares object references to detect changes. If you mutate the object directly, React doesn't know it changed.

## Common Mistakes

1. **Forgetting the spread operator**:
   ```typescript
   // WRONG - loses all other properties
   setProfile({ name: 'New Name' })

   // RIGHT - keeps all properties
   setProfile({ ...profile, name: 'New Name' })
   ```

2. **Mutating then setting**:
   ```typescript
   // WRONG - mutates then sets same reference
   profile.name = 'New Name'
   setProfile(profile)

   // RIGHT - create new object
   setProfile({ ...profile, name: 'New Name' })
   ```

3. **Not converting number inputs**:
   ```typescript
   // WRONG - age becomes a string "25"
   setProfile({ ...profile, age: e.target.value })

   // RIGHT - age is a number 25
   setProfile({ ...profile, age: Number(e.target.value) })
   ```

4. **Uncontrolled inputs**:
   ```typescript
   // WRONG - uncontrolled (no value prop)
   <input onChange={handleChange} />

   // RIGHT - controlled
   <input value={profile.name} onChange={handleChange} />
   ```

## Key Takeaways

1. **Immutability is crucial**: Always create new objects; never mutate state
2. **Spread operator is your friend**: Use `{ ...oldObject, changedProp: newValue }`
3. **Controlled inputs sync with state**: Set both `value` and `onChange`
4. **Type conversion matters**: Convert string inputs to numbers when needed
5. **Shallow copy is usually enough**: `...` spreads only one level deep

## When to Use Multiple useState vs. One Object

### Use Multiple useState When:
- Fields are independent
- You update them separately often
- Simple primitive values

### Use One Object When:
- Fields are logically related (like a profile)
- You often update multiple fields together
- You want to pass all data as one prop

## Further Learning

- **Nested objects**: How to update deeply nested properties
- **Arrays in objects**: Combining array and object immutability patterns
- **Immer library**: A tool that simplifies immutable updates
- **useReducer**: An alternative for complex state objects
