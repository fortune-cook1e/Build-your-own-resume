# Dockerfile for running Prisma on Linux Alpine 3.17+

# change with the Node.js version of your choice
ARG NODE_VERSION="20"

# change with the Linux Alpine version of your choice
ARG ALPINE_VERSION="3.17"




FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# install OpenSSL 1.1.x, needed for Linux Alpine 3.17+
RUN apk update \
  && apk add openssl1.1-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run prisma:generate
RUN pnpm run build

RUN pnpm deploy --filter=server --prod /prod/server

FROM base AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
EXPOSE 3002
ENV NODE_ENV=production
CMD [ "pnpm", "start:prod" ]