# Use an official Python base image
FROM python:3.9-slim

# Create a working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy your code
COPY main.py .

# Expose a default port for local dev/documentation; not strictly needed for Cloud Run
EXPOSE 8080

# Start the FastAPI app with Uvicorn using the runtime PORT environment variable
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]