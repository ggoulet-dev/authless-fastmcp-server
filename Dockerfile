# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install uv
RUN pip install uv

# Copy project files
COPY pyproject.toml ./
COPY authless_fastmcp_server ./authless_fastmcp_server

# Install dependencies
RUN uv sync --frozen

# Expose port 8000
EXPOSE 8000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=8000

# Run the server
CMD ["uv", "run", "python", "-m", "authless_fastmcp_server.main"]
