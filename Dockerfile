FROM node:10
RUN npm install webpack -g
RUN npm install webpack-cli -g

# Create app directory
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install
RUN npm run production
RUN npm run build

# Bundle app source
COPY . /usr/src/app
EXPOSE 3002
CMD ["npm", "start"]
