#From Jonas Liebegott 

FROM  node:lts-alpine3.15

WORKDIR /webdev/msokleinanzeigen_frontend/

ADD ./ .

RUN npm ci



ENTRYPOINT [ "npm", "start" ]
