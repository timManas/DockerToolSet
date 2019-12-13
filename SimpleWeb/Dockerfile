# Specify a base image
# FROM alpine
FROM node:alpine

WORKDIR /usr/app

# Install some dependencies
# COPY ./ ./    # Using this will constantly retrigger a build everytime a change is made
COPY ./package.json ./
RUN npm install
COPY ./ ./  

# Default command
CMD ["npm", "start"]

 