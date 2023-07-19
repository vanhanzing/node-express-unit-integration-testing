# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies 
# npm ci just installs existing dependencies,in contrast to npm install,
# which attempts to update current dependencies if possible.
# This ensures that the builds in continuous integration are reliable.
# It's better to use npm install in development and npm ci for production
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Node.js application listens
EXPOSE 3000

# Specify the command to run your application
CMD ["npm", "run", "dev"]
