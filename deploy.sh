#!/bin/bash

# Build and deploy script for Cloudflare
set -e

echo "🚀 Deploying FastMCP Server to Cloudflare..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Build the application
echo "📦 Building application..."
uv sync

# Create a simple server wrapper for Cloudflare Workers
echo "🔧 Creating Cloudflare Worker wrapper..."
mkdir -p dist

# Create the worker script
cat > dist/index.js << 'EOF'
import { FastMCP } from 'fastmcp';

export default {
  async fetch(request, env, ctx) {
    // For now, redirect to your deployed FastMCP server
    // This is a proxy approach until full Python support is available
    const targetUrl = env.FASTMCP_SERVER_URL || 'https://your-server.example.com';
    
    return fetch(new Request(targetUrl + request.url.slice(request.url.indexOf('/', 8)), {
      method: request.method,
      headers: request.headers,
      body: request.body
    }));
  }
};
EOF

# Deploy to Cloudflare Workers
echo "🌐 Deploying to Cloudflare Workers..."
wrangler deploy

echo "✅ Deployment complete!"
echo "📋 Next steps:"
echo "   1. Set up your FastMCP server on a cloud provider (Railway, Fly.io, etc.)"
echo "   2. Update the FASTMCP_SERVER_URL environment variable in Cloudflare"
echo "   3. Your MCP server will be available at: https://authless-fastmcp-server.your-subdomain.workers.dev"
