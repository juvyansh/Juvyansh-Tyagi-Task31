# Deployment Guide: VS Code → GitHub → Render

This guide assumes a Mac and a beginner workflow. The code in this folder is a small Express.js backend. You do not need to deploy a React frontend just to make the API URL respond.

## A. Open and run the project in VS Code

1. Download and unzip the project folder.
2. Open VS Code.
3. Choose **File → Open Folder…** and select `Juvyansh_Tyagi_Task31`.
4. Choose **Terminal → New Terminal**.
5. Check Node.js and npm are available:

   ```bash
   node -v
   npm -v
   ```

   If the commands are not found, install Node.js from https://nodejs.org and reopen the terminal.

6. Install the project's dependency and start the server:

   ```bash
   npm install
   npm start
   ```

7. Open these URLs in the browser:
   - `http://localhost:3000/`
   - `http://localhost:3000/health`
   - `http://localhost:3000/api/tasks`

   Leave the server terminal running while testing. Stop it with `Control + C`.

## B. Push the project to GitHub

### Option 1: Terminal commands (recommended)

1. Sign in at https://github.com.
2. Click **+ → New repository**.
3. Name it `Juvyansh-Tyagi-Task31`. Choose **Public** if you are comfortable making the code public and want the simplest sharing workflow. Do not upload secrets or passwords.
4. For a simple first push, create an empty repository (do not initialize it with a README, license, or `.gitignore`, because those are already in this folder).
5. In the VS Code terminal, from inside the project folder, run:

   ```bash
   git init
   git add .
   git commit -m "Create To-Do List Express API"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/Juvyansh-Tyagi-Task31.git
   git push -u origin main
   ```

6. Replace `YOUR-USERNAME` with your actual GitHub username before running the `git remote add` command. If Git asks you to sign in, follow the browser authentication prompt. Never put a password or access token into the source files.
7. Refresh the GitHub repository page. Confirm you can see `app.js`, `package.json`, and the README.

If `git remote add origin` says the remote already exists, use `git remote -v` to inspect it. Correct it with `git remote set-url origin https://github.com/YOUR-USERNAME/Juvyansh-Tyagi-Task31.git` instead of adding a second remote.

## C. Deploy the GitHub repository on Render

1. Sign in at https://render.com.
2. Connect your GitHub account when Render asks for repository access.
3. In the Render dashboard choose **New + → Web Service**. Do not choose Static Site; Express runs a server.
4. Select the `Juvyansh-Tyagi-Task31` repository and click **Connect**.
5. Configure the service approximately as follows:

   | Render field | Value |
   |---|---|
   | Name | `juvyansh-todo-api` or another available name |
   | Language / Runtime | `Node` |
   | Branch | `main` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance plan | Free, if available for your account |

6. Click **Create Web Service** and watch the deploy/build logs. The app reads the port from `process.env.PORT`, which Render supplies.
7. When Render reports that the service is live, copy the public `onrender.com` URL shown on the service page. The exact URL depends on the service name and availability, so do not guess it.

Official guide: https://render.com/docs/deploy-node-express-app

## D. Test the deployed URL

Replace `YOUR-RENDER-URL` below with the exact URL copied from Render. Do not include angle brackets.

1. Open `https://YOUR-RENDER-URL/` in your browser. You should see JSON with a message and endpoint list.
2. Open `https://YOUR-RENDER-URL/health`. You should see `{"status":"ok"}`.
3. Open `https://YOUR-RENDER-URL/api/tasks`. You should see a JSON array containing the sample task.
4. To test POST, use Postman or run this command after replacing the URL:

   ```bash
   curl -X POST https://YOUR-RENDER-URL/api/tasks \
     -H 'Content-Type: application/json' \
     -d '{"title":"Test deployed API","description":"Created using curl"}'
   ```

   The response should be the created task and include a generated `id`.

The API root returning JSON is expected: this is a backend API, not a polished website or React frontend.

## E. Updating your deployment

After changing a file, save it and push the changes:

```bash
git add .
git commit -m "Update API"
git push
```

When connected to the GitHub repository, Render normally redeploys on new commits to the configured branch. See https://render.com/docs/deploys.

## F. Final submission checklist

- [ ] The GitHub repository contains source code and documentation.
- [ ] Render shows the service as live.
- [ ] The deployed `/` and `/api/tasks` routes open successfully.
- [ ] Copy the exact deployed URL from Render for the submission portal.
- [ ] Keep `API_Documentation.docx`, `API_Documentation.md`, `README.md`, `app.js`, `package.json`, and this guide in the project folder.
- [ ] Create the ZIP with the required naming pattern, for example `Juvyansh_Tyagi_Task31.zip`.
- [ ] Upload the ZIP file and paste the deployed URL into the assignment portal.

## Important data limitation

This starter uses an in-memory array for simplicity. Data created through the API is temporary and can disappear when the service restarts or redeploys. Do not describe it as database-backed or production-ready. A database can be added in a later class if persistence is required.
