const CODESPACE_NAME = process.env.CODESPACE_NAME
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

export const API_PORT = PORT

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

export const config = {
  apiBaseUrl: API_BASE_URL,
  port: API_PORT,
  mongoUri: MONGO_URI,
  codespaceName: CODESPACE_NAME
}
