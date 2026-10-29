# To-Do List API with Express.js — TD31

**Student:** Juvyansh Tyagi  
**Roll No.:** 2500321540077

> AI-generated learning/reference draft. Review the assignment rules and ensure you understand the code and API design before submitting.

## Project objective

A simple REST API demonstrating how a To-Do List app can create, retrieve, update, and delete tasks using Express.js.

## Files

- `app.js` — Express server and API routes.
- `package.json` — project metadata, dependency, and start scripts.
- `API_Documentation.md` — endpoints, request formats, responses, CRUD mapping, and potential challenges.
- `API_Documentation.docx` — editable documentation document.
- `DEPLOYMENT_GUIDE.md` — step-by-step local, GitHub, and Render deployment guide.
- `SUBMISSION_FLOWCHART.md` — flowchart for the assignment submission process.

## Requirements

- Node.js 20 or newer
- npm
- VS Code (recommended)
- Git and a GitHub account
- Render account for deployment

## Run locally

1. Open this folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Confirm Node and npm are installed:

   ```bash
   node -v
   npm -v
   ```

4. Install dependencies and start the server:

   ```bash
   npm install
   npm start
   ```

5. Visit `http://localhost:3000/` and `http://localhost:3000/api/tasks` in a browser.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Welcome message and route list |
| GET | `/health` | Health check |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Replace task fields |
| PATCH | `/api/tasks/:id` | Partially update task fields |
| DELETE | `/api/tasks/:id` | Delete a task |

## Example create request

Use Postman or run this in the terminal while the server is running:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Complete assignment","description":"Test the POST endpoint"}'
```

## Deployment

Follow `DEPLOYMENT_GUIDE.md` to push the project to GitHub, deploy it as a Render **Web Service**, and test the public URL.

## Data storage limitation

The demonstration stores tasks in memory, not a database. Task changes can be lost when the service restarts or redeploys. Use a database for persistent data.
