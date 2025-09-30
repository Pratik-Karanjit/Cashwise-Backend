FROM node:22-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV NODE_ENV=production
ENV PORT=8080        
EXPOSE 8080          

CMD ["npm", "start"]
