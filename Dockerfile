FROM node:10.19.0

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000

RUN mv .env.example .env