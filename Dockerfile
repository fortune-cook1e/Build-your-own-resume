
ARG NODE_VERSION="20"
ARG ALPINE_VERSION="3.17"


FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


FROM base AS builder
WORKDIR /app
COPY . .


RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run prisma:generate
RUN pnpm run build

RUN pnpm --filter server --prod deploy /prod/server
RUN pnpm --filter board --prod deploy /prod/board
RUN pnpm --filter web --prod deploy /prod/web



FROM base AS server
WORKDIR /prod/server
COPY --from=build /prod/server ./
EXPOSE 3002
ENV NODE_ENV=production
CMD [ "pnpm", "start:prod" ]


FROM nginx:alpine as board
COPY --from=build /app/apps/board/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


FROM base AS web
WORKDIR /prod/web
COPY --from=builder /app/apps/web/public /prod/web/public
RUN mkdir .next
COPY --from=builder /app/apps/web/.next/standalone /prod/web/.next/standalone
COPY --from=builder /app/apps/web/.next/static /prod/web/.next/static
EXPOSE 3003
ENV NODE_ENV=production
CMD node /prod/web/.next/standalone/apps/web/server.js
