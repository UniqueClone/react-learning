# Lifting State Up

**Difficulty:** intermediate
**Type:** Complete Missing Parts
**Estimated Time:** 25-30 minutes

## Challenge

Build a temperature converter that syncs Celsius and Fahrenheit inputs in real-time. You'll need to "lift state up" to a common parent component so that both temperature inputs stay synchronized.

## Learning Objectives

- Understand when and why to lift state up
- Learn to share state between sibling components
- Master passing state and callbacks through props
- Practice deriving data from state
- Implement bidirectional data flow

## Instructions

1. Run `pnpm install` to install dependencies
2. Open [src/App.tsx](src/App.tsx)
3. Look for `TODO` comments in the code
4. Implement state management in the parent component
5. Complete the temperature conversion functions
6. Pass state and callbacks to child components
7. Run `pnpm dev` to test your implementation
8. Run `pnpm test` to verify all tests pass

## Requirements

- [ ] Temperature state is managed in the parent App component
- [ ] Celsius and Fahrenheit inputs are synchronized
- [ ] Typing in Celsius updates Fahrenheit automatically
- [ ] Typing in Fahrenheit updates Celsius automatically
- [ ] Temperature conversions are accurate
- [ ] TemperatureInput component receives temperature and callback via props
- [ ] All tests pass

## Hints

<details>
<summary>What does "lifting state up" mean?</summary>

When two components need to share state, you move (lift) the state to their closest common parent:

**Before (not synchronized):**
```typescript
function CelsiusInput() {
  const [temp, setTemp] = useState('')
  // ...
}

function FahrenheitInput() {
  const [temp, setTemp] = useState('')
  // ...
}
```

**After (synchronized):**
```typescript
function App() {
  const [celsius, setCelsius] = useState('')
  const fahrenheit = convertToFahrenheit(celsius)

  return (
    <>
      <CelsiusInput value={celsius} onChange={setCelsius} />
      <FahrenheitInput value={fahrenheit} onChange={/* ... */} />
    </>
  )
}
```

</details>

<details>
<summary>How do I convert between Celsius and Fahrenheit?</summary>

**Celsius to Fahrenheit:**
```typescript
F = (C × 9/5) + 32
```

**Fahrenheit to Celsius:**
```typescript
C = (F - 32) × 5/9
```

</details>

<details>
<summary>How do I handle changes from both inputs?</summary>

Store which scale was last edited:

```typescript
const [temperature, setTemperature] = useState('')
const [scale, setScale] = useState<'c' | 'f'>('c')

const handleCelsiusChange = (value: string) => {
  setTemperature(value)
  setScale('c')
}

const handleFahrenheitChange = (value: string) => {
  setTemperature(value)
  setScale('f')
}
```

Then derive the other value based on scale.

</details>

## Testing

Run `pnpm test` to check your implementation. The tests verify:
- Temperature inputs render correctly
- Typing in Celsius updates Fahrenheit
- Typing in Fahrenheit updates Celsius
- Conversions are accurate
- Inputs stay synchronized
