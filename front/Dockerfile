# Use the official Node.js image as a base
FROM node:18.6.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the source code to the container
COPY . .

# Copy env
# COPY .env .

# Install TypeScript
RUN npm install -g typescript

# Build the application using TypeScript
RUN npm run build

# Expose the port 3001 to the host system
EXPOSE 3001

# Run the application
CMD [ "npm", "run", "start" ]