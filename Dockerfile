FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9500

EXPOSE 9500

CMD ["npm", "start"]