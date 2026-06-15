import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { getApiBaseUrlForDisplay } from './api'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'
import './App.css'

export default function App() {
  const apiUrl = getApiBaseUrlForDisplay()

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-body text-center">
                      <h1 className="card-title">Welcome to OctoFit Tracker</h1>
                      <p className="card-text">
                        A multi-tier application for tracking fitness activities and building competitive teams.
                      </p>
                      <div className="alert alert-info mt-4">
                        <p className="mb-0">
                          <strong>API Base URL:</strong><br />
                          <code>{apiUrl}</code>
                        </p>
                      </div>
                      <p className="text-muted small mt-3">
                        Frontend running on port 5173 | Backend on port 8000 | MongoDB on port 27017
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } 
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Router>
  )
}
