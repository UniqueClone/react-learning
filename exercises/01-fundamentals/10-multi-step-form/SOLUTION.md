# Solution: Multi-Step Form Wizard

## Complete Solution

```typescript
import { useState } from 'react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  newsletter: boolean
  theme: 'light' | 'dark'
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    newsletter: false,
    theme: 'light',
  })

  // Update a specific field in form data
  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Validation for Step 1
  const validateStep1 = (): boolean => {
    if (formData.firstName.trim().length < 2) return false
    if (formData.lastName.trim().length < 2) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return false
    return true
  }

  // Validation for Step 2
  const validateStep2 = (): boolean => {
    if (formData.username.trim().length < 3) return false
    if (formData.password.length < 8) return false
    return true
  }

  // Navigation handlers
  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      alert('Please fill all required fields correctly in Step 1')
      return
    }
    if (currentStep === 2 && !validateStep2()) {
      alert('Please fill all required fields correctly in Step 2')
      return
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  // Show summary after submission
  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
        <h1>Registration Successful!</h1>
        <div
          style={{
            backgroundColor: '#d4edda',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #c3e6cb',
          }}
        >
          <h2>Summary</h2>
          <p>
            <strong>Name:</strong> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Username:</strong> {formData.username}
          </p>
          <p>
            <strong>Newsletter:</strong> {formData.newsletter ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Theme:</strong> {formData.theme}
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false)
            setCurrentStep(1)
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              username: '',
              password: '',
              newsletter: false,
              theme: 'light',
            })
          }}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1>Multi-Step Form Wizard</h1>

      {/* Progress Indicator */}
      <div style={{ marginBottom: '30px' }}>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
          Step {currentStep} of 3
        </p>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(currentStep / 3) * 100}%`,
              height: '100%',
              backgroundColor: '#007bff',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div>
            <h2>Personal Information</h2>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="firstName" style={{ display: 'block', marginBottom: '4px' }}>
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="lastName" style={{ display: 'block', marginBottom: '4px' }}>
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
            </div>
          </div>
        )}

        {/* Step 2: Account Setup */}
        {currentStep === 2 && (
          <div>
            <h2>Account Setup</h2>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '4px' }}>
                Username *
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => updateField('username', e.target.value)}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
              <small style={{ color: '#666' }}>Minimum 3 characters</small>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '4px' }}>
                Password *
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              />
              <small style={{ color: '#666' }}>Minimum 8 characters</small>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <div>
            <h2>Preferences</h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="newsletter"
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => updateField('newsletter', e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Subscribe to newsletter
              </label>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="theme" style={{ display: 'block', marginBottom: '4px' }}>
                Theme Preference
              </label>
              <select
                id="theme"
                value={formData.theme}
                onChange={(e) => updateField('theme', e.target.value as 'light' | 'dark')}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Back
            </button>
          )}

          {currentStep < 3 && (
            <button
              type="button"
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                marginLeft: 'auto',
              }}
            >
              Next
            </button>
          )}

          {currentStep === 3 && (
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                marginLeft: 'auto',
              }}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
```

## Key Concepts

### 1. Multi-Step State Management

**Core State:**
```typescript
const [currentStep, setCurrentStep] = useState(1)
const [formData, setFormData] = useState<FormData>({
  firstName: '',
  lastName: '',
  // ... all fields
})
```

**Why this structure?**
- `currentStep` tracks which step is visible
- `formData` stores all data in one place (single source of truth)
- Data persists across all steps

### 2. Conditional Rendering by Step

```typescript
{currentStep === 1 && <Step1Content />}
{currentStep === 2 && <Step2Content />}
{currentStep === 3 && <Step3Content />}
```

Only one step's content renders at a time, but all data is preserved.

### 3. Step-Specific Validation

Each step has its own validation logic:

```typescript
const validateStep1 = (): boolean => {
  if (formData.firstName.trim().length < 2) return false
  if (formData.lastName.trim().length < 2) return false
  if (!emailRegex.test(formData.email)) return false
  return true
}
```

**Key points:**
- Validation runs before advancing to next step
- Back button doesn't require validation
- Each step validates its own fields only

### 4. Navigation Logic

```typescript
const handleNext = () => {
  // Validate current step
  if (currentStep === 1 && !validateStep1()) {
    alert('Please fix errors')
    return  // Don't advance
  }
  // Advance to next step
  setCurrentStep(prev => prev + 1)
}

const handleBack = () => {
  // No validation needed
  setCurrentStep(prev => prev - 1)
}
```

**Navigation rules:**
- "Next" requires validation
- "Back" allows navigation without validation
- Can't skip steps

### 5. Data Persistence

All form data is stored in a single state object:

```typescript
const updateField = (field: keyof FormData, value: string | boolean) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}
```

**Benefits:**
- Data persists when navigating back/forward
- Easy to submit all data at once
- Single source of truth

### 6. Progress Indicator

Visual feedback showing completion:

```typescript
<div style={{ width: `${(currentStep / 3) * 100}%` }} />
```

Shows user how far they've progressed through the form.

## Implementation Details

### State Structure

```typescript
interface FormData {
  // Step 1 fields
  firstName: string
  lastName: string
  email: string

  // Step 2 fields
  username: string
  password: string

  // Step 3 fields
  newsletter: boolean
  theme: 'light' | 'dark'
}
```

**Why use an interface?**
- Type safety for all fields
- Autocomplete in IDE
- Catches typos at compile time

### Updating Fields

```typescript
const updateField = (field: keyof FormData, value: string | boolean) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}

// Usage
onChange={(e) => updateField('firstName', e.target.value)}
```

**Benefits:**
- Reusable function for all fields
- Maintains type safety with `keyof FormData`
- Uses functional update pattern

### Conditional Button Rendering

```typescript
{currentStep > 1 && <BackButton />}
{currentStep < 3 && <NextButton />}
{currentStep === 3 && <SubmitButton />}
```

Shows appropriate buttons for each step:
- Step 1: Only "Next"
- Step 2: "Back" and "Next"
- Step 3: "Back" and "Submit"

## Common Patterns

### Pattern 1: Step Component Extraction

For cleaner code, extract step content into components:

```typescript
interface StepProps {
  data: FormData
  onChange: (field: keyof FormData, value: any) => void
}

function Step1({ data, onChange }: StepProps) {
  return (
    <div>
      <h2>Personal Information</h2>
      {/* Step 1 fields */}
    </div>
  )
}

// In main component
{currentStep === 1 && <Step1 data={formData} onChange={updateField} />}
```

### Pattern 2: Validation Error Display

Show field-level errors:

```typescript
const [errors, setErrors] = useState<Record<string, string>>({})

const validateStep1 = () => {
  const newErrors: Record<string, string> = {}

  if (formData.firstName.length < 2) {
    newErrors.firstName = 'First name must be at least 2 characters'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

// Display errors
{errors.firstName && <span className="error">{errors.firstName}</span>}
```

### Pattern 3: Progress Steps Visualization

Visual step indicators:

```typescript
<div className="steps">
  {[1, 2, 3].map(step => (
    <div
      key={step}
      className={step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}
    >
      {step}
    </div>
  ))}
</div>
```

### Pattern 4: Form Summary Before Submit

Show review page before final submission:

```typescript
{currentStep === 4 && (
  <div>
    <h2>Review Your Information</h2>
    <p>Name: {formData.firstName} {formData.lastName}</p>
    <p>Email: {formData.email}</p>
    {/* ... other fields */}
    <button onClick={handleSubmit}>Confirm & Submit</button>
  </div>
)}
```

## Advanced Techniques

### 1. URL-Based Navigation

Use URL to track current step:

```typescript
const searchParams = new URLSearchParams(window.location.search)
const [currentStep, setCurrentStep] = useState(
  parseInt(searchParams.get('step') || '1')
)

useEffect(() => {
  // Update URL when step changes
  const newUrl = `?step=${currentStep}`
  window.history.pushState({}, '', newUrl)
}, [currentStep])
```

**Benefits:**
- Back button works
- Can bookmark specific steps
- Share URLs to specific steps

### 2. Local Storage Persistence

Save progress to local storage:

```typescript
useEffect(() => {
  localStorage.setItem('formData', JSON.stringify(formData))
}, [formData])

// Load on mount
const [formData, setFormData] = useState(() => {
  const saved = localStorage.getItem('formData')
  return saved ? JSON.parse(saved) : defaultFormData
})
```

**Benefits:**
- Data survives page refresh
- User can resume later
- Better UX for long forms

### 3. Async Validation

Validate with server (e.g., check if username is taken):

```typescript
const [isValidating, setIsValidating] = useState(false)

const validateUsername = async (username: string) => {
  setIsValidating(true)
  try {
    const response = await fetch(`/api/check-username?username=${username}`)
    const { available } = await response.json()
    return available
  } finally {
    setIsValidating(false)
  }
}
```

### 4. Dynamic Steps

Generate steps dynamically:

```typescript
const steps = [
  { id: 1, title: 'Personal', component: Step1, validate: validateStep1 },
  { id: 2, title: 'Account', component: Step2, validate: validateStep2 },
  { id: 3, title: 'Preferences', component: Step3, validate: () => true },
]

const currentStepData = steps[currentStep - 1]

return (
  <>
    <currentStepData.component />
    <button onClick={() => handleNext(currentStepData.validate)}>Next</button>
  </>
)
```

## Common Mistakes

### ❌ Separate state for each step
```typescript
const [step1Data, setStep1Data] = useState({})
const [step2Data, setStep2Data] = useState({})
// Data is fragmented!
```

### ✅ Single state object
```typescript
const [formData, setFormData] = useState({
  // All fields in one place
})
```

---

### ❌ Not validating before next
```typescript
const handleNext = () => {
  setCurrentStep(prev => prev + 1)
  // No validation!
}
```

### ✅ Validate before advancing
```typescript
const handleNext = () => {
  if (!validate()) return
  setCurrentStep(prev => prev + 1)
}
```

---

### ❌ Losing data when navigating
```typescript
{currentStep === 1 && <Step1 />}
// Step1 has its own state, data is lost!
```

### ✅ Pass data as props
```typescript
{currentStep === 1 && <Step1 data={formData} onChange={updateField} />}
```

---

### ❌ Not showing progress
```typescript
// User doesn't know how many steps remain
```

### ✅ Show progress indicator
```typescript
<div>Step {currentStep} of {totalSteps}</div>
<ProgressBar progress={(currentStep / totalSteps) * 100} />
```

## Key Takeaways

1. **Single source of truth** - Store all form data in one state object
2. **Conditional rendering** - Show/hide steps based on currentStep
3. **Validate before advancing** - But not when going back
4. **Data persistence** - Maintain data across all steps
5. **Progress indicators** - Show users where they are in the process
6. **User feedback** - Clear validation messages and navigation
7. **Type safety** - Use TypeScript interfaces for form data
8. **Flexible navigation** - Support both forward and backward movement

## Further Practice

- Add a "Save Draft" feature that stores progress
- Implement skip/optional steps
- Add step-specific progress within each step
- Create a review/summary step before final submission
- Add keyboard navigation (Enter to advance, Escape to cancel)
- Implement form data validation on blur
- Add animation between step transitions
- Create a wizard that adapts steps based on previous answers
- Add the ability to edit any previous step from review page
- Implement wizard with branching logic (different paths based on answers)
