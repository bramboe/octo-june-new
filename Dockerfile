FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Expose a default port (change if your app uses a different one)
EXPOSE 3000

CMD ["yarn", "start"] 