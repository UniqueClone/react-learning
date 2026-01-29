export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Tailwind Button Component
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sizes</h2>
            <div className="flex flex-wrap gap-4">
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Colors (Solid)</h2>
            <div className="flex flex-wrap gap-4">
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Colors (Outline)</h2>
            <div className="flex flex-wrap gap-4">
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Combinations</h2>
            <div className="flex flex-wrap gap-4">
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
