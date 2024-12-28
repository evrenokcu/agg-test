# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file from the scripts directory
COPY scripts/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python script directory to /app
COPY scripts/ .

# Use the environment variable $PORT for exposing the container's port

EXPOSE $PORT

# Run the Python server when the container launches
CMD ["python", "llm-call-server.py"]
