# authless-fastmcp-server

A simple MCP (Model Context Protocol) server built with FastMCP that provides a basic weather tool.

## Features

- **Weather Tool**: Returns random weather information with temperatures between 20-30°C
- **FastMCP**: Built using the FastMCP framework for easy MCP server development
- **UV**: Uses UV package manager for fast dependency management

## Installation

1. Make sure you have `uv` installed:
```bash
pip install uv
```

2. Clone and setup the project:
```bash
cd authless-fastmcp-server
uv sync
```

## Running the Server

### Method 1: Direct Python execution
```bash
uv run python authless_fastmcp_server/main.py
```

### Method 2: Using the CLI script
```bash
uv run weather-mcp
```

### Method 3: Using FastMCP CLI
```bash
uv run fastmcp run authless_fastmcp_server/main.py
```

## Usage

The server provides one tool:

- `get_weather(location: str = "Paris")`: Returns a simple weather forecast with temperature between 20-30°C

### Example
When you ask for weather information, the tool will return something like:
```
Weather in Paris: 25°C, sunny
Weather in London: 28°C, partly cloudy
```

## Testing

You can test the server by connecting with any MCP-compatible client or using the FastMCP client:

```python
import asyncio
from fastmcp import Client

async def test_weather():
    async with Client("authless_fastmcp_server/main.py") as client:
        result = await client.call_tool("get_weather", {"location": "Tokyo"})
        print(result[0].text)

asyncio.run(test_weather())
```

## Deployment to Cloudflare

### Option 1: TypeScript Cloudflare Workers (Recommended)

Since Cloudflare Python Workers are in beta with limited package support, we've created a TypeScript-based MCP server:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

3. **Development**:
   ```bash
   npm run dev  # Local Cloudflare Workers development
   ```

### Option 2: Python Development (Local/External Hosting)

For Python development and testing:

1. **Local development**:
   ```bash
   npm run python-dev
   ```

2. **Deploy to external platforms** (Railway, Fly.io, Render):
   ```bash
   # Using the provided Dockerfile
   docker build -t authless-fastmcp-server .
   docker run -p 8000:8000 authless-fastmcp-server
   ```

### Cloudflare Dashboard Settings

For Cloudflare Pages/Workers dashboard:

- **Build Command**: `npm run build`
- **Deploy Command**: `npx wrangler deploy`
- **Root Directory**: `/`
- **Framework**: `None`

### API Endpoints

Once deployed, your MCP server provides:

- **Health Check**: `https://your-worker.workers.dev/`
- **MCP Endpoint**: `https://your-worker.workers.dev/mcp`

### Configuration Files

- `wrangler.toml`: Cloudflare Workers configuration
- `tsconfig.json`: TypeScript compilation settings
- `src/index.ts`: Main Cloudflare Worker code
- `package.json`: Node.js dependencies and scripts

## Development

This server is built with:
- **FastMCP**: Python framework for building MCP servers
- **UV**: Fast Python package manager
- **Random**: For generating weather data (20-30°C range)

The weather data is completely simulated and returns random temperatures in the 20-30 degrees Celsius range as requested.