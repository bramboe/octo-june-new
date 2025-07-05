FROM node:20-alpine

RUN apk --no-cache add git

COPY package.json /octo-june/
COPY yarn.lock /octo-june/
WORKDIR /octo-june

RUN yarn install

COPY src /octo-june/src/
COPY tsconfig.build.json /octo-june/
COPY tsconfig.json /octo-june/

RUN yarn build:ci

FROM node:20-alpine

# Add env
ENV LANG C.UTF-8

RUN apk add --no-cache bash curl jq && \
    curl -J -L -o /tmp/bashio.tar.gz "https://github.com/hassio-addons/bashio/archive/v0.13.1.tar.gz" && \
    mkdir /tmp/bashio && \
    tar zxvf /tmp/bashio.tar.gz --strip 1 -C /tmp/bashio && \
    mv /tmp/bashio/lib /usr/lib/bashio && \
    ln -s /usr/lib/bashio/bashio /usr/bin/bashio

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

WORKDIR /octo-june
COPY run.sh /octo-june/
RUN chmod a+x run.sh

COPY --from=0 /octo-june/node_modules /octo-june/node_modules
COPY --from=0 /octo-june/dist/tsc/ /octo-june/

EXPOSE 8099

ENTRYPOINT [ "/octo-june/run.sh" ]
#ENTRYPOINT [ "node", "index.js" ]
LABEL \
    io.hass.name="Octo June Integration via MQTT" \
    io.hass.description="Home Assistant Community Add-on for Octo Smartbeds" \
    io.hass.type="addon" \
    io.hass.version="0.0.1" \
    maintainer="Bram Boersma"