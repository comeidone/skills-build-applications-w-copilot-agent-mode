import React, { useEffect, useState } from 'react'
import { fetchFromApi } from '../api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [period, setPeriod] = useState('weekly')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchFromApi(`/api/leaderboard?period=${period}`)
        setLeaderboard(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }
    loadLeaderboard()
  }, [period])

  if (loading) return <div className="container"><p>Loading leaderboard...</p></div>
  if (error) return <div className="container"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <div className="mb-3">
        <select 
          className="form-select" 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="all-time">All Time</option>
        </select>
      </div>
      {leaderboard.length === 0 ? (
        <p>No leaderboard entries found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Score</th>
              <th>Activities</th>
              <th>Distance (km)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(entry => (
              <tr key={entry._id}>
                <td><span className="badge bg-primary">{entry.rank}</span></td>
                <td>{entry.user?.username || 'Unknown'}</td>
                <td>{entry.team?.name || '-'}</td>
                <td><strong>{entry.score}</strong></td>
                <td>{entry.activitiesCount}</td>
                <td>{entry.totalDistance}</td>
                <td>{entry.totalCalories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
