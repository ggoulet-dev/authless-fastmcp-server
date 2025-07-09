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

### Option 1: Remote MCP Server (Recommended)

Since Cloudflare Workers has limited Python support, the best approach is to deploy your FastMCP server as a Remote MCP Server:

1. **Deploy to a cloud platform** (Railway, Fly.io, Render, etc.):
   ```bash
   # Using the provided Dockerfile
   docker build -t authless-fastmcp-server .
   docker run -p 8000:8000 authless-fastmcp-server
   ```

2. **Configure as Remote MCP Server**:
   - Your server will be accessible via HTTP at: `https://your-domain.com/mcp/`
   - Connect MCP clients using: `https://your-domain.com/mcp/`

### Option 2: Cloudflare Workers Proxy

For Cloudflare-specific deployment:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **Set environment variables** in Cloudflare Dashboard:
   - `FASTMCP_SERVER_URL`: URL of your deployed FastMCP server

### Configuration Files

- `wrangler.toml`: Cloudflare Workers configuration
- `Dockerfile`: Container configuration for cloud deployment
- `deploy.sh`: Automated deployment script

## Development

This server is built with:
- **FastMCP**: Python framework for building MCP servers
- **UV**: Fast Python package manager
- **Random**: For generating weather data (20-30°C range)

The weather data is completely simulated and returns random temperatures in the 20-30 degrees Celsius range as requested.