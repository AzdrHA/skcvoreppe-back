FROM node:16-alpine

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

WORKDIR /srv/app

RUN set -eux;

EXPOSE ${APP_PORT}
ENV TZ Europe/Paris

ENTRYPOINT ["docker-entrypoint"]
