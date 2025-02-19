# Use Node 22 base image for building the Next.js app
FROM node:22-slim AS builder

# Set the working directory for the client
WORKDIR /client

# Copy package.json and package-lock.json first to leverage Docker caching for dependencies
COPY ./client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Next.js application code into the container
COPY ./client/ .

# Build the Next.js app for production
RUN npm run build

# Expose the port that your Next.js app will run on
EXPOSE 3030

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
