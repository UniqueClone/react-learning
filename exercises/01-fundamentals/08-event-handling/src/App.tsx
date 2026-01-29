import { useState } from 'react'

// This component has 5 event handling bugs. Find and fix them all!

export default function App() {
  const [message, setMessage] = useState('')
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
  const [clickCount, setClickCount] = useState(0)

  // Bug 1: Form submission causes page reload
  const handleSubmit = (e: React.FormEvent) => {
    setMessage('Form submitted successfully!')
  }

  // Bug 2: Link should not navigate
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMessage('Link clicked (but not navigated)')
  }

  // Bug 3: Inner button click also triggers outer div click
  const handleOuterClick = () => {
    setMessage('Outer div clicked')
  }

  const handleInnerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMessage('Inner button clicked')
  }

  // Bug 4: Delete function is called immediately instead of on click
  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
    setMessage(`Deleted item ${index + 1}`)
  }

  // Bug 5: Double-click should increment counter
  const handleDoubleClick = () => {
    setClickCount(clickCount + 1)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Event Handling Bugs</h1>

      {/* Status Message */}
      {message && (
        <div
          style={{
            padding: '12px',
            marginBottom: '20px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
          }}
        >
          {message}
        </div>
      )}

      {/* Bug 1: Form submission */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 1: Form Submission</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter some text"
            style={{ padding: '8px', marginRight: '8px' }}
          />
          <button type="submit">Submit Form</button>
        </form>
        <p style={{ fontSize: '14px', color: '#666' }}>
          The page should NOT reload when submitting
        </p>
      </section>

      {/* Bug 2: Link navigation */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 2: Link Click</h2>
        <a href="https://example.com" onClick={handleLinkClick}>
          Click this link (should not navigate)
        </a>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Should show message without navigating away
        </p>
      </section>

      {/* Bug 3: Event bubbling */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 3: Event Bubbling</h2>
        <div
          onClick={handleOuterClick}
          style={{
            padding: '20px',
            backgroundColor: '#f0f0f0',
            border: '2px solid #ccc',
            borderRadius: '4px',
          }}
        >
          Outer Div (clickable)
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleInnerClick}>
              Inner Button (should NOT trigger outer click)
            </button>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Inner button should only show "Inner button clicked"
        </p>
      </section>

      {/* Bug 4: Function called immediately */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 4: Delete Buttons</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {item}
              <button
                onClick={handleDelete(index)}
                style={{ marginLeft: '10px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Buttons should delete items when clicked, not immediately
        </p>
      </section>

      {/* Bug 5: Double-click handler */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 5: Double-Click</h2>
        <div
          onClick={handleDoubleClick}
          style={{
            padding: '20px',
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          Double-click me! Count: {clickCount}
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Should increment on double-click, not single-click
        </p>
      </section>
    </div>
  )
}
