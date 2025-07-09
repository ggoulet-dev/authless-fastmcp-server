import { 
  CallToolRequest, 
  ListToolsRequest,
  Tool,
  CallToolResult,
  ListToolsResult,
  TextContent
} from '@modelcontextprotocol/sdk/types.js';

export interface Env {
  // Environment variables can be defined here
}

// Weather tool implementation
function getWeather(location: string = "Paris"): string {
  // Generate a random temperature between 20 and 30 degrees
  const temperature = Math.floor(Math.random() * 11) + 20;
  
  // Simple weather conditions
  const conditions = ["sunny", "partly cloudy", "cloudy", "light rain"];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return `Weather in ${location}: ${temperature}°C, ${condition}`;
}

// Define available tools
const tools: Tool[] = [
  {
    name: "get_weather",
    description: "Get a simple weather forecast for a location. Returns a temperature between 20-30 degrees Celsius.",
    inputSchema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The location to get weather for",
          default: "Paris"
        }
      }
    }
  }
];

// Handle MCP requests
async function handleMCPRequest(request: Request): Promise<Response> {
  try {
    const body = await request.json() as any;
    
    // Handle list tools request
    if (body.method === "tools/list") {
      const result: ListToolsResult = {
        tools: tools
      };
      
      return new Response(JSON.stringify({
        jsonrpc: "2.0",
        id: body.id,
        result: result
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // Handle call tool request
    if (body.method === "tools/call") {
      const params = body.params as CallToolRequest;
      
      if (params.name === "get_weather") {
        const location = params.arguments?.location || "Paris";
        const weatherResult = getWeather(location);
        
        const result: CallToolResult = {
          content: [
            {
              type: "text",
              text: weatherResult
            } as TextContent
          ]
        };
        
        return new Response(JSON.stringify({
          jsonrpc: "2.0",
          id: body.id,
          result: result
        }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      
      // Tool not found
      return new Response(JSON.stringify({
        jsonrpc: "2.0",
        id: body.id,
        error: {
          code: -32601,
          message: `Tool ${params.name} not found`
        }
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // Method not supported
    return new Response(JSON.stringify({
      jsonrpc: "2.0",
      id: body.id,
      error: {
        code: -32601,
        message: "Method not found"
      }
    }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error"
      }
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
    
    // Health check endpoint
    if (url.pathname === "/" && request.method === "GET") {
      return new Response(JSON.stringify({
        name: "Weather MCP Server",
        version: "1.0.0",
        description: "A simple MCP server with weather tool",
        endpoints: {
          mcp: "/mcp"
        }
      }), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    
    // MCP endpoint
    if (url.pathname === "/mcp" && request.method === "POST") {
      const response = await handleMCPRequest(request);
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }
    
    // Default 404
    return new Response("Not Found", { 
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
