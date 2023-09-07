FROM node:18.15.0

WORKDIR /app

COPY package.json /app

RUN npm install -g yarn

RUN yarn install

COPY . /app

RUN yarn build

CMD ["yarn", "start"]