FROM node:14.8.0-alpine3.11

EXPOSE 8000

RUN apk update && \
    apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing vips-tools vips-dev fftw-dev gcc g++ make libc6-compat && \
    apk add git && \
    apk add python && \
    rm -rf /var/cache/apk/*

RUN npm install --global gatsby --no-optional gatsby@2.24.47

RUN mkdir -p /site
WORKDIR /site
VOLUME /site

COPY ./entry.sh /
RUN chmod +x /entry.sh
ENTRYPOINT ["/entry.sh"]





