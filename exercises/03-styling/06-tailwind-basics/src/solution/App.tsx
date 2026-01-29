// All Tailwind classes fixed!

export default function App() {
  return (
    <div className="p-20 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Tailwind CSS Basics
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Card Title</h2>
          <p className="text-gray-600 text-base">
            All Tailwind class names are now correct!
          </p>

          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Hover Me
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded">
            <h3 className="font-bold">Card 1</h3>
            <p className="text-sm text-gray-500">Responsive grid</p>
          </div>
          <div className="bg-white p-4 rounded">
            <h3 className="font-bold">Card 2</h3>
            <p className="text-sm text-gray-500">Fix the classes</p>
          </div>
          <div className="bg-white p-4 rounded">
            <h3 className="font-bold">Card 3</h3>
            <p className="text-sm text-gray-500">Mobile first</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Focus on me"
          className="mt-6 w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  )
}
