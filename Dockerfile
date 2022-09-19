FROM node:16.14.2-alpine

WORKDIR /opt

COPY package.json /opt/
COPY yarn.lock /opt

RUN yarn

COPY . /opt/

EXPOSE 3000
CMD ["yarn", "start"]