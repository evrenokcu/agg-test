# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file from the scripts directory and install dependencies
COPY scripts/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python script directory to /app
COPY scripts/ .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run server2.py when the container launches
CMD ["python", "llm-call-server.py"]