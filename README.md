PM2 Service Manager

A simple, custom wrapper around PM2 for managing multiple Node.js services during local development.
🔍 Overview

This tool lets you:

    Start/stop multiple services easily

    Run dev services with consistent logs

    Simplify local microservice orchestration

    Use a single config file to define service behavior

Useful for monorepos or microservice-based setups where each service runs independently.
⚙️ How It Works

    Reads your service list from services.config.js

    Uses PM2 to start each process with your specified options

    Handles process logs, watch mode, and auto-restart

📦 Installation

Clone the repo:

git clone https://github.com/Javlon-M/pm2-service.git
cd pm2-service
npm install

🚀 Usage
1. Define Services

In services.config.js:

module.exports = [
  {
    name: 'auth-service',
    script: './services/auth/index.js',
    watch: true,
  },
  {
    name: 'payment-worker',
    script: './services/payment/worker.js',
    watch: true,
  },
]

2. Start Services

npm run compile
npm run start

This runs src/index.js which uses PM2 to boot all services.
3. Stop Services

npm run stop

📁 Project Structure

pm2-service/
├── src/
│   └── components/pm2.ts     # PM2 logic
|   └── index.ts
├── services.config.js        # List of services to run
├── package.json
└── README.md

📌 Dependencies

    pm2

Install globally if not already:

npm install -g pm2

✅ Example Output

When running:

[PM2] Starting auth-service
[PM2] Starting payment-worker
[PM2] Logs streaming...
auth-service > Server running on port 3000
payment-worker > Connected to Redis...
