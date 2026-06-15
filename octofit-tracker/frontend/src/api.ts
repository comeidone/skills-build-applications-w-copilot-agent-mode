/**
 * API utility for OctoFit Tracker
 * 
 * Requires VITE_CODESPACE_NAME environment variable to be set.
 * Define it in .env.local:
 *   VITE_CODESPACE_NAME=your-codespace-name
 */

const getApiBaseUrl = (): string => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME not set. Falling back to localhost.',
      'Add VITE_CODESPACE_NAME to .env.local for Codespaces deployment.'
    )
    return 'http://localhost:8000'
  }
  
  return `https://${codespaceName}-8000.app.github.dev`
}

/**
 * Build a full API endpoint URL
 * @param path - API path (e.g., '/api/users')
 * @returns Full API URL
 */
export const buildApiUrl = (path: string): string => {
  const baseUrl = getApiBaseUrl()
  return `${baseUrl}${path}`
}

/**
 * Fetch data from API endpoint
 * @param path - API path (e.g., '/api/users')
 * @returns Promise with JSON data
 */
export const fetchFromApi = async <T>(path: string): Promise<T> => {
  const url = buildApiUrl(path)
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Get API base URL for display purposes
 */
export const getApiBaseUrlForDisplay = (): string => {
  return getApiBaseUrl()
}
