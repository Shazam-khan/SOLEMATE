import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Placeholder URL for backend API
const API_URL = 'http://localhost:5000/api/auth/login' // Adjust this URL if needed

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(API_URL, { email, password })
      console.log(response);
      if (response.status === 200) {
        // Redirect to admin dashboard on successful login
        navigate('/dashboard')
      }
    } catch (error) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown-100 to-brown-300">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-brown-800">ADMIN LOGIN</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 border-2 border-custom-brown text-black hover:bg-custom-brown hover:text-white rounded-md"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  )
}
