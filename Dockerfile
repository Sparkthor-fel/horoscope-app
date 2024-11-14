FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json /app
RUN npm ci
COPY . /app
CMD ["node","app.cjs"]
