# Pull node image from docker hub
FROM node:14 as base

# Set working directory
WORKDIR /home/node/app

# Copy and install dependencies
COPY package*.json ./
RUN npm i

# Copy source code
COPY . .

# Use base image for production
FROM base as production

# Set path for source code
ENV NODE_PATH=./dist

# Build code
RUN npm run build

# ~HELPFUL COMMANDS~
# Build image:         docker build -t <username (optional)>/node-template .
# Run image:           docker run -p 5000:5000 -d <username (optional)>/node-template
# Get container ID:    docker ps
# Print app output:    docker logs <container id>
# Enter the container: docker exec -it <container id> /bin/bash
