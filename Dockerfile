# Stage 1: Build the Node.js (backend) application
FROM node:16.14 as builder-backend

WORKDIR /app

# Set environment variables
ARG DB_HOST
ENV DB_HOST=$DB_HOST
ARG DB_USER
ENV DB_USER=$DB_USER
ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD
ARG DB_NAME
ENV DB_NAME=$DB_NAME

# Copy the backend source code to /app
COPY ./backend ./

# Clone your GitHub repository using the HTTPS URL (Assuming Git is available)
RUN apt-get update && apt-get install -y git && git clone https://github.com/Stagy73/WattCal.git /app/repo

# Install backend dependencies
RUN npm install

# Build the backend (if applicable)
# Uncomment the following line if you need to build the backend
# RUN npm run build

# Stage 2: Build the React (frontend) application
FROM node:16.14 as builder-frontend

WORKDIR /app

# Copy package.json and package-lock.json to install frontend dependencies
COPY package*.json ./

# Install Vite and frontend dependencies
RUN npm install -g create-vite
RUN npm install -g vite
RUN npm install

# Copy the entire frontend project, excluding node_modules
COPY ./frontend ./frontend

# Build the frontend
WORKDIR /app/frontend
RUN npm run build

# Stage 3: Create the final production image
FROM node:16.14

WORKDIR /app

# Copy the built backend and frontend from their respective stages
COPY --from=builder-backend /app /app
COPY --from=builder-frontend /app /app

# Expose the port if your backend is running on a specific port
# EXPOSE 3000

# Start your application, change "npm run dev" to the command to start your backend
CMD ["npm", "run", "start"]
