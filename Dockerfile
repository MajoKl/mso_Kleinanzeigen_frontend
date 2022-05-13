#From Jonas Liebegott 

FROM  node:lts-alpine3.15

WORKDIR /webdev/msokleinanzeigen_frontend/

ADD ./ .

RUN npm ci

RUN npm run build 

RUN npm install -g serve

ENTRYPOINT [ "serve", "-s", "build" ]
