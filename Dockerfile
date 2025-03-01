FROM node:18-alpine
WORKDIR /app
EXPOSE 5173
COPY ["package.json","package-lock.json*","./"]
RUN npm install
COPY . .
CMD ["npm","run","build"]

FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf