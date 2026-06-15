import React, { useEffect, useState } from 'react'
import { fetchFromApi } from '../api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchFromApi('/api/users')
        setUsers(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  if (loading) return <div className="container"><p>Loading users...</p></div>
  if (error) return <div className="container"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Bio</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.profile?.firstName || '-'}</td>
                <td>{user.profile?.lastName || '-'}</td>
                <td>{user.profile?.bio || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
