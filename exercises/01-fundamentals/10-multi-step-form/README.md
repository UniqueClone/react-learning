# Multi-Step Form Wizard

**Difficulty:** advanced
**Type:** Build From Scratch
**Estimated Time:** 30-35 minutes

## Challenge

Build a complete multi-step form wizard with 3 steps (Personal Info, Account Setup, Preferences). Implement step navigation, progress tracking, form validation, and data persistence across steps. This exercise combines multiple fundamental React concepts.

## Requirements

Your implementation must:
- Create a 3-step form wizard with distinct steps
- Implement "Next", "Back", and "Submit" navigation
- Display a progress indicator showing current step
- Validate each step before allowing navigation to the next
- Persist form data across all steps
- Show a summary on the final submission
- Prevent navigation to next step if current step is invalid
- Allow navigation back without validation

## Learning Objectives

- Combine multiple React fundamentals (state, events, forms, conditionals)
- Manage complex multi-step workflows
- Implement step-by-step navigation logic
- Validate forms across multiple pages
- Persist state across component renders
- Build user-friendly multi-page experiences

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Plan your state structure (current step, form data)
5. Implement the 3 form steps with validation
6. Add navigation logic (Next, Back, Submit)
7. Add a progress indicator
8. Run `pnpm dev` to test manually
9. Run `pnpm test` to verify all tests pass

## Form Steps

### Step 1: Personal Information
- First Name (required, min 2 characters)
- Last Name (required, min 2 characters)
- Email (required, valid email format)

### Step 2: Account Setup
- Username (required, min 3 characters)
- Password (required, min 8 characters)

### Step 3: Preferences
- Newsletter subscription (checkbox)
- Theme preference (light/dark select)

## Acceptance Criteria

- [ ] Three distinct form steps are implemented
- [ ] Progress indicator shows current step (1/3, 2/3, 3/3)
- [ ] "Next" button advances to next step (with validation)
- [ ] "Back" button returns to previous step (no validation)
- [ ] "Submit" button appears on final step
- [ ] Each step validates before allowing next
- [ ] Form data persists across all steps
- [ ] Final submission shows summary of all data
- [ ] All tests pass

## Hints

<details>
<summary>How do I manage multi-step state?</summary>

Track the current step and form data:

```typescript
const [currentStep, setCurrentStep] = useState(1)
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  newsletter: false,
  theme: 'light'
})
```

Update specific fields:
```typescript
const updateField = (field: string, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}
```

</details>

<details>
<summary>How do I validate each step?</summary>

Create step-specific validation:

```typescript
const validateStep1 = () => {
  return (
    formData.firstName.length >= 2 &&
    formData.lastName.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  )
}

const handleNext = () => {
  if (currentStep === 1 && !validateStep1()) {
    alert('Please fill all required fields')
    return
  }
  setCurrentStep(prev => prev + 1)
}
```

</details>

<details>
<summary>How do I render different steps?</summary>

Use conditional rendering based on currentStep:

```typescript
{currentStep === 1 && <Step1 data={formData} onChange={updateField} />}
{currentStep === 2 && <Step2 data={formData} onChange={updateField} />}
{currentStep === 3 && <Step3 data={formData} onChange={updateField} />}
```

Or use a switch statement for cleaner code.

</details>

<details>
<summary>How do I create a progress indicator?</summary>

Show visual progress:

```typescript
<div>
  Step {currentStep} of 3
  <div className="progress-bar">
    <div style={{ width: `${(currentStep / 3) * 100}%` }} />
  </div>
</div>
```

</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. The tests verify:
- Step navigation works correctly
- Progress indicator updates
- Validation prevents invalid submissions
- Back button doesn't require validation
- Form data persists across steps
- Final submission shows all data
