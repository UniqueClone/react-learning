import { useState } from 'react'

type Scale = 'c' | 'f'

function toCelsius(fahrenheit: string): string {
  return ''
}

function toFahrenheit(celsius: string): string {
  return ''
}

// Helper function to try conversion
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
  const [temperature, setTemperature] = useState('')
  const [scale, setScale] = useState<Scale>('c')

  const handleCelsiusChange = (temp: string) => {
  }

  const handleFahrenheitChange = (temp: string) => {
  }

  const celsius = ''
  const fahrenheit = ''

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Temperature Converter</h1>
      <p>Enter a temperature in either Celsius or Fahrenheit. The other will update automatically.</p>

      <TemperatureInput
        scale="c"
        temperature={''}
        onTemperatureChange={() => {}}
      />

      <TemperatureInput
        scale="f"
        temperature={''}
        onTemperatureChange={() => {}}
      />

      {/* Boiling verdict - only show if we have a valid celsius value */}
      {celsius && !Number.isNaN(parseFloat(celsius)) && (
        <BoilingVerdict celsius={parseFloat(celsius)} />
      )}
    </div>
  )
}
