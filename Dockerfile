FROM node:19.2.0-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn --ignore-engines

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]