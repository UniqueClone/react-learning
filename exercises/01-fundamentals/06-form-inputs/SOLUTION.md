# Solution: Controlled Form Inputs

## Complete Solution

```typescript
import { useState } from 'react'

export default function App() {
  // State for all form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    // Prevent default browser form submission
    e.preventDefault()

    // Reset previous messages
    setError('')
    setSuccess(false)

    // Validate name
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Validate password
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    // Validate terms acceptance
    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions')
      return
    }

    // If all validations pass, show success
    setSuccess(true)
    console.log('Form submitted:', { name, email, password, country, agreeToTerms })
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '4px' }}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Country Select */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="country" style={{ display: 'block', marginBottom: '4px' }}>
            Country:
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
          </select>
        </div>

        {/* Terms Checkbox */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            I agree to the terms and conditions
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
          }}
        >
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
          }}
        >
          Registration successful! Welcome, {name}!
        </div>
      )}
    </div>
  )
}
```

## Key Concepts

### 1. Controlled Components

A controlled component is a form element whose value is controlled by React state:

```typescript
const [value, setValue] = useState('')

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**Why use controlled components?**
- Single source of truth (state)
- Easy to validate, transform, or manipulate input
- Predictable behavior
- Easy to test

### 2. Different Input Types

**Text/Email/Password Inputs:**
```typescript
value={text}
onChange={(e) => setText(e.target.value)}
```

**Checkbox:**
```typescript
checked={isChecked}
onChange={(e) => setIsChecked(e.target.checked)}
```
Note: Checkboxes use `checked` prop, not `value`, and `e.target.checked` to read the boolean value.

**Select Dropdown:**
```typescript
value={selected}
onChange={(e) => setSelected(e.target.value)}
```

### 3. Form Submission

Always prevent default form submission to handle it with JavaScript:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault() // Prevents page reload
  // Your validation and submission logic
}
```

### 4. Form Validation

Validate inputs before submission:

```typescript
// Length validation
if (name.trim().length < 2) {
  setError('Name too short')
  return
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(email)) {
  setError('Invalid email')
  return
}

// Boolean validation
if (!agreeToTerms) {
  setError('Must agree to terms')
  return
}
```

**Validation Strategies:**
- **On Submit:** Validate when form is submitted (implemented here)
- **On Blur:** Validate when user leaves a field
- **On Change:** Validate as user types (real-time)
- **Combination:** Mix approaches for best UX

### 5. Displaying Feedback

Use conditional rendering to show errors or success:

```typescript
{error && <div className="error">{error}</div>}
{success && <div className="success">Success!</div>}
```

## Common Patterns

### Form State Management

**Individual State Variables (Simple Forms):**
```typescript
const [name, setName] = useState('')
const [email, setEmail] = useState('')
```

**Single Object State (Complex Forms):**
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
})

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}
```

### Validation Patterns

**Inline Validation:**
```typescript
const emailError = email && !emailRegex.test(email)
  ? 'Invalid email'
  : ''
```

**Validation Function:**
```typescript
const validateForm = () => {
  const errors: Record<string, string> = {}

  if (name.length < 2) errors.name = 'Name too short'
  if (!emailRegex.test(email)) errors.email = 'Invalid email'

  return errors
}
```

## Common Mistakes

### ❌ Uncontrolled Inputs
```typescript
// Missing value and onChange
<input type="text" />
// Input not controlled by React state
```

### ✅ Controlled Input
```typescript
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

---

### ❌ Forgetting preventDefault
```typescript
const handleSubmit = (e: React.FormEvent) => {
  // Missing e.preventDefault()
  // Page will reload!
}
```

### ✅ Correct
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Now form submission is controlled
}
```

---

### ❌ Wrong checkbox property
```typescript
<input
  type="checkbox"
  value={isChecked} // Wrong!
  onChange={(e) => setIsChecked(e.target.value)} // Wrong!
/>
```

### ✅ Correct
```typescript
<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

## Performance Optimization

For large forms, consider:

1. **Debouncing validation** (don't validate on every keystroke)
2. **useCallback** for event handlers
3. **Form libraries** like React Hook Form or Formik
4. **Field-level validation** instead of full form validation

## Key Takeaways

1. **Controlled components** keep form state in sync with React state
2. **Different input types** require different props (`value` vs `checked`)
3. **Always preventDefault** on form submission to handle it with JavaScript
4. **Validate early, validate often** but balance with UX
5. **Clear error messages** help users fix issues
6. **Consider form libraries** for complex forms with many fields

## Further Practice

- Add real-time validation (validate as user types)
- Implement password strength indicator
- Add confirm password field
- Show field-level errors (not just one error at a time)
- Add form reset functionality
- Implement file upload input
- Create a multi-step form
