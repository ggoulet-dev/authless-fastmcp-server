#!/bin/bash

# Build and deploy script for Cloudflare Workers
set -e

echo "🚀 Deploying MCP Server to Cloudflare Workers..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the TypeScript application
echo "� Building TypeScript application..."
npm run build

# Deploy to Cloudflare Workers
echo "🌐 Deploying to Cloudflare Workers..."
npm run deploy

echo "✅ Deployment complete!"
echo "📋 Your MCP server is now available at:"
echo "   🌍 Production: https://authless-fastmcp-server.your-subdomain.workers.dev"
echo "   🔧 MCP Endpoint: https://authless-fastmcp-server.your-subdomain.workers.dev/mcp"
echo ""
echo "🧪 Test your server:"
echo "   curl https://authless-fastmcp-server.your-subdomain.workers.dev"
echo ""
echo "🔗 Connect to MCP clients using:"
echo "   https://authless-fastmcp-server.your-subdomain.workers.dev/mcp"
