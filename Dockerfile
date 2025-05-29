# Step 1: Use Node.js base image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependency files and install
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the app
COPY . .

# Step 5: Copy environment file
COPY .env .env

# Step 6: Expose the app port
EXPOSE 3000

# Step 7: Run the app
CMD ["npm", "start"]
