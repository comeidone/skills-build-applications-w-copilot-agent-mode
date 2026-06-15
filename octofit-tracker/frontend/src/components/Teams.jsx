import React, { useEffect, useState } from 'react'
import { fetchFromApi } from '../api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchFromApi('/api/teams')
        setTeams(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams')
      } finally {
        setLoading(false)
      }
    }
    loadTeams()
  }, [])

  if (loading) return <div className="container"><p>Loading teams...</p></div>
  if (error) return <div className="container"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <div className="row">
          {teams.map(team => (
            <div key={team._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <p className="small text-muted">
                    <strong>Leader:</strong> {team.leader?.username || 'Unknown'}
                  </p>
                  <p className="small text-muted">
                    <strong>Members:</strong> {team.members?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
