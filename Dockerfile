FROM node:18-slim
WORKDIR /app
COPY package*.json ./  ./

RUN npm install

EXPOSE 3001
CMD ["node" ,"./src/app.js"]