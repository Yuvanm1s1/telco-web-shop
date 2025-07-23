# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --include=dev
# RUN npm install nodemon --save-dev

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "dev"]

FROM node:18

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install --include=dev

# Explicitly force nodemon to be available in node_modules/.bin/
RUN npm install nodemon --save-dev

COPY . .

EXPOSE 3000

# Use 'npx' to ensure the local nodemon is used
CMD ["npx", "nodemon", "src/index.js"]
