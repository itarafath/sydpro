FROM node:12.18.4-alpine

# Work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY ./package*.json ./

# Install app dependencies
RUN npm install

# Copy dir
COPY ./ .

# Build and run the app
CMD npm run dev
