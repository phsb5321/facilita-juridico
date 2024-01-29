FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000
ENV PORT=3000

RUN npm install -g typescript

USER node

CMD ["npm", "run", "dev"]
