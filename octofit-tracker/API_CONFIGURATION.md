# OctoFit Tracker - API Configuration

## Backend API Setup

### Port Configuration
- **Backend API Port:** `8000`
- **MongoDB Port:** `27017`
- **Frontend Port:** `5173`

### API Base URL Resolution

The backend automatically detects the environment and sets the API base URL accordingly:

#### Codespaces Environment
When running in GitHub Codespaces, the API URL is automatically constructed as:
```
https://{CODESPACE_NAME}-8000.app.github.dev
```

Example in Codespaces:
```
https://verbose-space-train-5vj6v7pvv49fvx7g-8000.app.github.dev
```

#### Local Development
When running locally (without `CODESPACE_NAME`), the API URL falls back to:
```
http://localhost:8000
```

### API Endpoints

#### Available Routes
- `GET /` - API information and available endpoints
- `GET /health` - Health check with current API URL
- `GET /api/users` - List all users
- `GET /api/teams` - List all teams
- `GET /api/activities` - List all activities
- `GET /api/leaderboard` - Get leaderboard (with period query param)
- `GET /api/workouts` - List all workouts

### Running the Backend

**Development:**
```bash
npm --prefix octofit-tracker/backend run dev
```

**Seed Database:**
```bash
npm --prefix octofit-tracker/backend run seed
```

**Build:**
```bash
npm --prefix octofit-tracker/backend run build
```

### Testing API Endpoints

```bash
# Health check
curl http://localhost:8000/health

# List users
curl http://localhost:8000/api/users

# List activities
curl http://localhost:8000/api/activities

# List teams
curl http://localhost:8000/api/teams

# Get leaderboard (weekly)
curl http://localhost:8000/api/leaderboard?period=weekly
```

### Environment Variables

- `MONGO_URL` - MongoDB connection string (default: `mongodb://localhost:27017/octofit_db`)
- `PORT` - Backend API port (default: `8000`)
- `CODESPACE_NAME` - Automatically set in GitHub Codespaces

### Database

- **Database Name:** `octofit_db`
- **Collections:** users, teams, activities, workouts, leaderboard
- **Connection String:** `mongodb://localhost:27017/octofit_db`
