FROM node:22-alpine

RUN apk add --no-cache python3 make g++
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", ".output/server/index.mjs"]
