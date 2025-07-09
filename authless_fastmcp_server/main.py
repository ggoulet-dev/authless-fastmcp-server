"""
A simple MCP server with a basic weather tool.
"""

import random
import os
from fastmcp import FastMCP

# Create the MCP server instance
mcp = FastMCP(name="Weather MCP Server")

@mcp.tool
def get_weather(location: str = "Paris") -> str:
    """
    Get a simple weather forecast for a location.
    Returns a temperature between 20-30 degrees Celsius.
    
    Args:
        location: The location to get weather for (default: Paris)
    
    Returns:
        A string with the weather information
    """
    # Generate a random temperature between 20 and 30 degrees
    temperature = random.randint(20, 30)
    
    # Simple weather conditions
    conditions = ["sunny", "partly cloudy", "cloudy", "light rain"]
    condition = random.choice(conditions)
    
    return f"Weather in {location}: {temperature}°C, {condition}"

def main():
    """Main entry point for the server."""
    # For remote deployment, use HTTP transport
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    
    # Use streamable HTTP transport for remote MCP servers
    mcp.run(transport="http", host=host, port=port)

if __name__ == "__main__":
    main()
