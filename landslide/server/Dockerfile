# Use a Python 3.9 base image (Bookworm variant)
FROM python:3.9-bookworm

# Install necessary system dependencies for GDAL and clean up
RUN apt-get update && \
    apt-get install -y gdal-bin libgdal-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /server

# Copy the application code into the container
COPY ./server/ .

# Copy requirements.txt into the container (make sure it's accessible)
COPY ./server/requirements.txt ./requirements.txt

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Expose the port that your Flask app will run on
EXPOSE 5050

# Start the Flask application
CMD ["python", "server.py"]
