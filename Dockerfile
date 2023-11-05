# Stage 1: Build the Node.js (backend) application
FROM node:16.14 as builder-backend

WORKDIR /app

# Set environment variables for the backend
ARG DB_HOST
ENV DB_HOST=host.docker.internal
ARG DB_USER
ENV DB_USER=nils
ARG DB_PASSWORD
ENV DB_PASSWORD=nm
ARG DB_NAME
ENV DB_NAME=wattcal

# Copy the local backend source code and package.json to /app
COPY ./backend /app
COPY ./backend/package.json /app

# Install backend dependencies
RUN npm install

# Build the backend (if applicable)
# Uncomment the following line if you need to build the backend
# RUN npm run build

# Stage 2: Build the React (frontend) application
FROM node:16.14 as builder-frontend

# Set the working directory for frontend build
WORKDIR /app/frontend

# Copy package.json and package-lock.json to install frontend dependencies
COPY ./frontend/package*.json ./

# Install frontend dependencies (no need to reinstall Vite)
RUN npm install

# Copy the local frontend project, excluding node_modules
COPY ./frontend /app/frontend

# Build the frontend
RUN npm run build

# Stage 3: Create the final production image
FROM node:16.14

WORKDIR /app

# Copy the built backend and frontend from their respective stages
COPY --from=builder-backend /app /app
COPY --from=builder-frontend /app /app

# Expose the port if your backend is running on a specific port
EXPOSE 3000

# Start your application, change "npm run dev" to the command to start your backend
CMD ["npm", "run", "dev"]
