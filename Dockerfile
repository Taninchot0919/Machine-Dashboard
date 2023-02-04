FROM node:14.19.0-slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

RUN ls -la /usr/src/app
RUN npm run build

ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["npm", "start"]