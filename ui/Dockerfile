# Use Node.js LTS as the base image
FROM node:18-alpine
RUN apk add --no-cache curl
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY components.json next-env.d.ts tsconfig.json next.config.ts postcss.config.mjs tailwind.config.ts ./ 

COPY ./src ./src
COPY ./public ./public


# Build the Next.js app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]