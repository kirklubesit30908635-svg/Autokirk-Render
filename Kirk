# 🔱 Autokirk MCP Server — V1 Deployment Scaffold
*A clean, professional Node.js foundation for powering Autokirk’s MCP-integrated services.*

This repository contains a **minimal, production-ready Express server** designed to run as the backend service for **Autokirk MCP connectors**, Render deployments, and future Autokirk Engine integrations.

This version resolves issues like:

- Missing `package.json` paths  
- Incorrect Render root directories  
- Misconfigured build/start commands  
- Missing healthcheck endpoints  

All fixes and structure improvements come directly from the uploaded files.

---

## 🚀 Project Structure

```text
Autokirk-MCP-Server/
│
├── package.json
├── server.js
├── render.yaml
└── README.md
```

### ✔ `package.json` — Node project definition  
Defines your entry file (`server.js`), scripts, dependencies, and node engine.

### ✔ `server.js` — Express server  
Implements core endpoints (`/`, `/health`, `/api/info`) with CORS + logging middleware.

### ✔ `render.yaml` — Render deployment config  
Configures build & start commands, environment, and autodeploy policies.

---

## ⚙️ Local Development

Install dependencies:

```bash
npm install
```

Start the server locally:

```bash
npm start
```

Now test it:

- http://localhost:3000/  
- http://localhost:3000/health  
- http://localhost:3000/api/info  

If these respond correctly → the server is deployed properly.

---

## 🌐 Render Deployment Guide (Corrected)

Render requires this repo’s root as its **Root Directory**.

### Render Settings

| Setting         | Value              |
|----------------|--------------------|
| **Environment**| Node               |
| **Root Directory** | *(leave blank)* or `.` |
| **Build Command** | `npm install`    |
| **Start Command** | `npm start`      |
| **Auto Deploy** | On                |

### How Render Builds It

Render will:

1. Clone your GitHub repo  
2. Look for `package.json` in the ROOT (fixed)  
3. Install dependencies  
4. Launch `node server.js`  
5. Begin responding to `/` and `/health`  

This fixes the exact error you encountered:

```text
ENOENT: no such file or directory, open '/opt/render/project/src/package.json'
```

Because now `package.json` is at the correct root level.

---

## 🧠 Technical Enhancements Included in This Version

The server contains:

- Centralized middleware (CORS, logging, JSON parsing)  
- Upstream support for MCP integration  
- Future-ready route namespace under `/api/*`  
- Healthcheck endpoint (`/health`) required by Render  
- Clear separation of concerns for future Autokirk Engines  

---

## 🔮 Next Extensions You Can Add

When you're ready for V2 or V3, these are the logical Autokirk upgrades:

- Add MCP-compatible tool endpoints  
- Add authentication (API keys or JWT)  
- Add persistent storage  
- Add Autokirk Engine modules  
- Add analytics and telemetry  
- Add Amazon Shopping Module integration  
- Add Vault Engine integration  

---

## 🛡️ Environment Variables

These environment variables are recognized:

- `PORT` — Port to listen on (default: `3000`)
- `LOG_LEVEL` — Logging verbosity (default: `dev`)
- `ALLOWED_ORIGINS` — Comma-separated list of allowed CORS origins (optional)

You can configure them in Render’s *Environment* section or via a `.env` file when running locally.

---

## ✅ Quick Health Checklist

- `npm install` completes with no errors  
- `npm start` prints: `[Autokirk MCP] Server listening on port 3000` (or your `PORT`)  
- `/health` returns `{ "status": "healthy" }`  
- `/api/info` returns a JSON object with name, version, and timestamp  

When all of that works, you have a solid foundation for building Autokirk’s MCP-powered ecosystem.
