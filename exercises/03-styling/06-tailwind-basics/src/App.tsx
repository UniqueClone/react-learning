// This code has BUGS! Fix the incorrect Tailwind class names.
// Hints: Check utility names, responsive modifiers, and state variants

export default function App() {
  return (
    <div className="padding-20 background-gray-100 min-height-screen">
      <div className="max-width-4xl margin-x-auto">
        <h1 className="text-4xl font-bold color-blue-600 margin-bottom-8">
          Tailwind CSS Basics
        </h1>

        {/* BUG: Wrong utility names */}
        <div className="background-white rounded-large shadow-medium padding-6 margin-bottom-6">
          <h2 className="text-2xl font-semibold margin-bottom-4">Card Title</h2>
          <p className="color-gray-600 text-base">
            This card has several Tailwind class name bugs. Can you fix them all?
          </p>

          {/* BUG: Wrong hover syntax */}
          <button className="margin-top-4 background-blue-500 color-white padding-x-4 padding-y-2 rounded hover-background-blue-600">
            Hover Me
          </button>
        </div>

        {/* BUG: Wrong responsive modifiers */}
        <div className="grid grid-columns-1 medium:grid-columns-2 large:grid-columns-3 gap-4">
          <div className="background-white padding-4 rounded">
            <h3 className="font-bold">Card 1</h3>
            <p className="text-small color-gray-500">Responsive grid</p>
          </div>
          <div className="background-white padding-4 rounded">
            <h3 className="font-bold">Card 2</h3>
            <p className="text-small color-gray-500">Fix the classes</p>
          </div>
          <div className="background-white padding-4 rounded">
            <h3 className="font-bold">Card 3</h3>
            <p className="text-small color-gray-500">Mobile first</p>
          </div>
        </div>

        {/* BUG: Wrong focus variant */}
        <input
          type="text"
          placeholder="Focus on me"
          className="margin-top-6 width-full padding-3 border border-color-gray-300 rounded focus-border-color-blue-500 focus-outline-none"
        />
      </div>
    </div>
  )
}
