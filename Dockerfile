FROM node:10
# Create app directory
COPY . /app
WORKDIR /app

# Bundle app source
EXPOSE 3002
CMD ["npm", "start"]
