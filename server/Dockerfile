FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

COPY . .

CMD ["npm", "run", "dev"]
