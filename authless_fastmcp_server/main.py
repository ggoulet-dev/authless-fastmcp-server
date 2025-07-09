"""
A simple MCP server with a basic weather tool.
"""

import random
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
    if __name__ == "__main__":
        mcp.run()

if __name__ == "__main__":
    mcp.run()
