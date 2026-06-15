import React, { useEffect, useState } from 'react'
import { fetchFromApi } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchFromApi('/api/activities')
        setActivities(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
      } finally {
        setLoading(false)
      }
    }
    loadActivities()
  }, [])

  if (loading) return <div className="container"><p>Loading activities...</p></div>
  if (error) return <div className="container"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Distance (km)</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity._id}>
                <td>{activity.user?.username || 'Unknown'}</td>
                <td><span className="badge bg-info">{activity.type}</span></td>
                <td>{activity.duration}</td>
                <td>{activity.distance}</td>
                <td>{activity.calories}</td>
                <td>{new Date(activity.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
