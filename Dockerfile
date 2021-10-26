# pull official base image
FROM node:14.17.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
ARG PORT
ENV PORT ${PORT}
# add app
COPY . ./
# start app
CMD ng serve --port ${PORT} --host 0.0.0.0 --disable-host-check
