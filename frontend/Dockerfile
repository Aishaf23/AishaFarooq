# get the base node image
FROM node:alpine as builder

# set the working dir for container
WORKDIR /app

# copy the json file first
COPY ./package.json /app

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

EXPOSE 3000

# build the folder
CMD [ "npm", "run", "start" ]
