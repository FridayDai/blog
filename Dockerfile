FROM node:10
RUN npm install
RUN npm production
RUN npm build
COPY . .
WORKDIR /serverDist
EXPOSE 3002
CMD ["node", "server.js"]
