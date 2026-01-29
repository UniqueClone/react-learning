# Solution: Lifting State Up

## Complete Solution

```typescript
import { useState } from 'react'

type Scale = 'c' | 'f'

// Conversion functions
function toCelsius(fahrenheit: string): string {
  const f = parseFloat(fahrenheit)
  if (Number.isNaN(f)) return ''
  const c = ((f - 32) * 5) / 9
  return c.toString()
}

function toFahrenheit(celsius: string): string {
  const c = parseFloat(celsius)
  if (Number.isNaN(c)) return ''
  const f = (c * 9) / 5 + 32
  return f.toString()
}

function tryConvert(temperature: string, convert: (temp: string) => string): string {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ''
  }
  return convert(temperature)
}

interface TemperatureInputProps {
  scale: Scale
  temperature: string
  onTemperatureChange: (temperature: string) => void
}

function TemperatureInput({ scale, temperature, onTemperatureChange }: TemperatureInputProps) {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor={`temp-${scale}`} style={{ display: 'block', marginBottom: '4px' }}>
        Enter temperature in {scaleNames[scale]}:
      </label>
      <input
        id={`temp-${scale}`}
        type="number"
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
        style={{ padding: '8px', width: '200px' }}
      />
    </div>
  )
}

function BoilingVerdict({ celsius }: { celsius: number }) {
  if (celsius >= 100) {
    return <p style={{ color: 'red', fontWeight: 'bold' }}>The water would boil.</p>
  }
  return <p style={{ color: 'blue' }}>The water would not boil.</p>
}

export default function App() {
  // State lifted to parent component
  const [temperature, setTemperature] = useState('')
  const [scale, setScale] = useState<Scale>('c')

  // Handlers that update both temperature and scale
  const handleCelsiusChange = (temp: string) => {
    setTemperature(temp)
    setScale('c')
  }

  const handleFahrenheitChange = (temp: string) => {
    setTemperature(temp)
    setScale('f')
  }

  // Derive the display values based on which scale was last edited
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Temperature Converter</h1>
      <p>Enter a temperature in either Celsius or Fahrenheit. The other will update automatically.</p>

      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />

      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />

      {celsius && !Number.isNaN(parseFloat(celsius)) && (
        <BoilingVerdict celsius={parseFloat(celsius)} />
      )}
    </div>
  )
}
```

## The Concept: Lifting State Up

### Problem

Two sibling components need to share and synchronize state. If each component maintains its own state, they can't stay in sync:

```typescript
// ❌ Problem: Components can't synchronize
function CelsiusInput() {
  const [temp, setTemp] = useState('') // Isolated state
  return <input value={temp} onChange={(e) => setTemp(e.target.value)} />
}

function FahrenheitInput() {
  const [temp, setTemp] = useState('') // Separate isolated state
  return <input value={temp} onChange={(e) => setTemp(e.target.value)} />
}
```

### Solution

Lift the state to the closest common ancestor (parent component):

```typescript
// ✅ Solution: Share state through parent
function App() {
  const [temperature, setTemperature] = useState('')
  const [scale, setScale] = useState('c')

  return (
    <>
      <CelsiusInput value={celsius} onChange={handleCelsiusChange} />
      <FahrenheitInput value={fahrenheit} onChange={handleFahrenheitChange} />
    </>
  )
}
```

## Key Implementation Details

### 1. State Management

Store two pieces of state:
- `temperature` - The actual temperature value
- `scale` - Which scale was last edited ('c' or 'f')

```typescript
const [temperature, setTemperature] = useState('')
const [scale, setScale] = useState<Scale>('c')
```

**Why store scale?** We need to know which input was last edited so we can convert from that value to the other scale.

### 2. Conversion Functions

Implement the temperature conversion formulas:

```typescript
function toCelsius(fahrenheit: string): string {
  const f = parseFloat(fahrenheit)
  if (Number.isNaN(f)) return ''
  const c = ((f - 32) * 5) / 9
  return c.toString()
}

function toFahrenheit(celsius: string): string {
  const c = parseFloat(celsius)
  if (Number.isNaN(c)) return ''
  const f = (c * 9) / 5 + 32
  return f.toString()
}
```

**Formulas:**
- Celsius to Fahrenheit: `F = (C × 9/5) + 32`
- Fahrenheit to Celsius: `C = (F - 32) × 5/9`

### 3. Change Handlers

Each input has its own handler that updates both temperature and scale:

```typescript
const handleCelsiusChange = (temp: string) => {
  setTemperature(temp)
  setScale('c')  // Remember that Celsius was edited
}

const handleFahrenheitChange = (temp: string) => {
  setTemperature(temp)
  setScale('f')  // Remember that Fahrenheit was edited
}
```

### 4. Derived Values

Calculate what to display based on which scale was last edited:

```typescript
const celsius = scale === 'f'
  ? tryConvert(temperature, toCelsius)  // Convert from F to C
  : temperature                          // Use as-is

const fahrenheit = scale === 'c'
  ? tryConvert(temperature, toFahrenheit) // Convert from C to F
  : temperature                            // Use as-is
```

**Logic:**
- If scale is 'c', `temperature` is in Celsius → convert to Fahrenheit
- If scale is 'f', `temperature` is in Fahrenheit → convert to Celsius

### 5. Child Component Props

Pass state down and callbacks up:

```typescript
<TemperatureInput
  scale="c"
  temperature={celsius}           // ⬇ State flows down
  onTemperatureChange={handleCelsiusChange}  // ⬆ Changes flow up
/>
```

## The Data Flow

### When user types in Celsius input:

1. **User types "100"** in Celsius input
2. **onChange fires** → calls `handleCelsiusChange('100')`
3. **Parent state updates:**
   - `temperature` = '100'
   - `scale` = 'c'
4. **Derived values recalculate:**
   - `celsius` = '100' (no conversion needed, scale is 'c')
   - `fahrenheit` = tryConvert('100', toFahrenheit) → '212'
5. **Components re-render** with new values:
   - Celsius input shows '100'
   - Fahrenheit input shows '212'

### When user types in Fahrenheit input:

1. **User types "32"** in Fahrenheit input
2. **onChange fires** → calls `handleFahrenheitChange('32')`
3. **Parent state updates:**
   - `temperature` = '32'
   - `scale` = 'f'
4. **Derived values recalculate:**
   - `celsius` = tryConvert('32', toCelsius) → '0'
   - `fahrenheit` = '32' (no conversion needed, scale is 'f')
5. **Components re-render** with new values:
   - Celsius input shows '0'
   - Fahrenheit input shows '32'

## Key Concepts

### Single Source of Truth

**Before (Multiple sources of truth):**
```typescript
function CelsiusInput() {
  const [celsius, setCelsius] = useState('') // ❌ One source
}

function FahrenheitInput() {
  const [fahrenheit, setFahrenheit] = useState('') // ❌ Another source
}
```

**After (Single source of truth):**
```typescript
function App() {
  const [temperature, setTemperature] = useState('') // ✅ Single source
  const [scale, setScale] = useState('c')

  // Derive other values
  const celsius = scale === 'f' ? convert(temperature) : temperature
  const fahrenheit = scale === 'c' ? convert(temperature) : temperature
}
```

### Controlled Components

Child components don't manage their own state:

```typescript
function TemperatureInput({ temperature, onTemperatureChange }) {
  // No useState! Value comes from props
  return (
    <input
      value={temperature}  // Controlled by parent
      onChange={(e) => onTemperatureChange(e.target.value)}  // Notify parent
    />
  )
}
```

### Unidirectional Data Flow

Data flows in one direction:

```
Parent (State)
  ↓ Props
Child (Display & Events)
  ↑ Callbacks
Parent (Updates State)
  ↓ Props (New Values)
Child (Re-renders)
```

## Common Patterns

### Pattern 1: Derived State

Don't store data you can calculate:

```typescript
// ❌ Storing both (can get out of sync)
const [celsius, setCelsius] = useState('')
const [fahrenheit, setFahrenheit] = useState('')

// ✅ Store one, derive the other
const [celsius, setCelsius] = useState('')
const fahrenheit = (parseFloat(celsius) * 9/5 + 32).toString()
```

### Pattern 2: Last Edit Wins

Track which input was last edited:

```typescript
const [value, setValue] = useState('')
const [source, setSource] = useState<'input1' | 'input2'>('input1')

const handleInput1Change = (val: string) => {
  setValue(val)
  setSource('input1')
}

const handleInput2Change = (val: string) => {
  setValue(val)
  setSource('input2')
}
```

### Pattern 3: Callback Props

Pass functions down so children can trigger updates:

```typescript
interface ChildProps {
  value: string
  onChange: (value: string) => void  // Callback prop
}

function Child({ value, onChange }: ChildProps) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />
}
```

## When to Lift State Up

Lift state when:

1. **Two components need to share data**
2. **Components need to stay synchronized**
3. **One component's change should affect another**
4. **You need a single source of truth**

Don't lift state when:

1. **Only one component needs the data**
2. **State is purely local (like hover state)**
3. **No other component cares about changes**

## Common Mistakes

### ❌ Each component managing its own state
```typescript
function CelsiusInput() {
  const [celsius, setCelsius] = useState('')
  // Can't sync with Fahrenheit input!
}
```

### ✅ Parent manages shared state
```typescript
function App() {
  const [temperature, setTemperature] = useState('')
  // Both inputs use this state
}
```

---

### ❌ Storing derived data
```typescript
const [celsius, setCelsius] = useState('')
const [fahrenheit, setFahrenheit] = useState('') // Can get out of sync!
```

### ✅ Calculating derived data
```typescript
const [celsius, setCelsius] = useState('')
const fahrenheit = convertToFahrenheit(celsius) // Always in sync
```

---

### ❌ Not tracking which input was edited
```typescript
const [temperature, setTemperature] = useState('')
// How do we know if this is C or F?
```

### ✅ Tracking the scale
```typescript
const [temperature, setTemperature] = useState('')
const [scale, setScale] = useState<'c' | 'f'>('c')
// Now we know which scale to use!
```

## Key Takeaways

1. **Lift state to the closest common ancestor** when components need to share data
2. **Single source of truth** - store state in one place, derive everything else
3. **Data flows down, events flow up** - props go down, callbacks come up
4. **Controlled components** receive value and onChange from parent
5. **Track source of changes** when multiple inputs affect the same data
6. **Derive, don't duplicate** - calculate values instead of storing them
7. **Keep components focused** - parent manages state, children display and emit events

## Further Practice

- Add Kelvin scale support (third input)
- Add input validation (min/max temperatures)
- Format numbers to specific decimal places
- Add a temperature history feature
- Implement undo/redo functionality
- Add unit tests for conversion functions
- Create a currency converter using the same pattern
- Build a length/weight converter
- Implement a synchronized slider and text input
