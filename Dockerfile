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

# Clone your GitHub repository
RUN git clone https://github.com/yourusername/yourrepository.git /app/repo

# Install backend dependencies
RUN npm install

# Build the backend (if applicable)
# RUN npm run build

# Stage 2: Build the React (frontend) application
FROM node:16.14 as builder-frontend

WORKDIR /app

# Copy package.json and package-lock.json to install frontend dependencies
COPY package*.json ./




# Clone your GitHub repository using the HTTPS URL
RUN git clone https://github.com/Stagy73/WattCal.git /app/repo


# Install frontend dependencies
RUN npm install

# Copy the entire frontend project, excluding node_modules
COPY . .

# Build the frontend
RUN npm run build
