// Complete the user profile editor with immutable object updates
// See README.md for full requirements

export default function App() {

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  }

  return (
    <div>
      <h1>User Profile Editor</h1>

      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
          />
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
          />
        </div>
      </form>

      <div>
        <h2>Current Profile</h2>
      </div>
    </div>
  )
}
