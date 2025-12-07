require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// --- Configuration ---
const PORT = process.env.PORT || 3000;
const LOG_LEVEL = process.env.LOG_LEVEL || 'dev';

// CORS configuration: allow specific origins if provided, otherwise allow all in dev
const rawOrigins = process.env.ALLOWED_ORIGINS;
let corsOptions = {};

if (rawOrigins && rawOrigins.trim().length > 0) {
  const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());
  corsOptions = {
    origin: function (origin, callback) {
      // allow non-browser tools (no origin) or listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
}

// --- Core middleware ---
app.use(helmet());
app.use(express.json());
app.use(morgan(LOG_LEVEL));
app.use(corsOptions.origin ? cors(corsOptions) : cors());

// --- Basic routes ---

// Root: simple status + hint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Autokirk MCP Server',
    message:
      'Deployment successful. Extend this server with MCP-compatible routes and Autokirk Engine integrations.',
    env: {
      node: process.version,
      port: PORT,
      logLevel: LOG_LEVEL,
    },
  });
});

// Health: suitable for Render / uptime checks
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', time: new Date().toISOString() });
});

// Info: basic metadata
app.get('/api/info', (_req, res) => {
  res.json({
    name: 'autokirk-mcp-server',
    version: '1.1.0',
    time: new Date().toISOString(),
  });
});

// Example MCP-style stub route for future expansion
app.post('/api/mcp/ping', (req, res) => {
  res.json({
    type: 'mcp-ping',
    receivedAt: new Date().toISOString(),
    body: req.body || null,
    message: 'Autokirk MCP stub endpoint is online. Wire this into your MCP connector when ready.',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[Autokirk MCP] Error handler caught:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`[Autokirk MCP] Server listening on port ${PORT}`);
});
