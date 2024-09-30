FROM node:18-alpine3.19 as base

COPY ./ /home/server
WORKDIR /home/server

FROM base as install

RUN mkdir -p /temp/dev/

COPY package.json package-lock.json /temp/dev/

RUN cd /temp/dev/ && npm install --frozen-lockfile

FROM install as run

RUN cd /home/server

COPY --from=install /temp/dev/package.json /temp/dev/package-lock.json  ./
COPY --from=install /temp/dev/node_modules node_modules

ENTRYPOINT ["npm", "start"]