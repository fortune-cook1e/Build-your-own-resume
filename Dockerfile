
ARG NODE_VERSION="20"
ARG ALPINE_VERSION="3.17"


FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


FROM base AS build
WORKDIR /app
COPY . .


RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run prisma:generate
RUN pnpm run build

RUN pnpm --filter server --prod deploy /prod/server
RUN pnpm --filter board --prod deploy /prod/board



FROM base AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
EXPOSE 3002
ENV NODE_ENV=production
CMD [ "pnpm", "start:prod" ]


# FROM nginx:alpine as board
# COPY --from=build /prod/board /prod/board
# WORKDIR /prod/board
# RUN ls
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]