import React, { useEffect, useState } from 'react'
import { fetchFromApi } from '../api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchFromApi('/api/workouts')
        setWorkouts(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }
    loadWorkouts()
  }, [])

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-success'
      case 'intermediate':
        return 'bg-warning'
      case 'advanced':
        return 'bg-danger'
      default:
        return 'bg-secondary'
    }
  }

  if (loading) return <div className="container"><p>Loading workouts...</p></div>
  if (error) return <div className="container"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map(workout => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description || 'No description'}</p>
                  <p className="small">
                    <strong>Created by:</strong> {workout.user?.username || 'Unknown'}
                  </p>
                  <p className="small">
                    <strong>Duration:</strong> {workout.duration} min
                  </p>
                  <p>
                    <span className={`badge ${getDifficultyBadgeColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </p>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="small">
                      <strong>Exercises:</strong>
                      <ul className="mt-2">
                        {workout.exercises.map((ex, idx) => (
                          <li key={idx}>
                            {ex.name} - {ex.sets} sets × {ex.reps} reps
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
