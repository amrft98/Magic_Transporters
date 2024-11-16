FROM node:18-alpine

# Set a working directory

WORKDIR /app


COPY package*.json ./


# Install Node.js dependencies
RUN npm install


# Copy application files
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
