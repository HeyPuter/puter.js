FROM node:21-alpine

# Set labels
LABEL repo="https://github.com/HeyPuter/puter.js"
LABEL license="AGPL-3.0,https://github.com/HeyPuter/puter.js/blob/main/LICENSE.txt"
LABEL version="v1.0.0"

# Debugging
RUN apk add --no-cache bash # useful for debugging

# Setup working directory
RUN mkdir -p /opt/puter.js/app
WORKDIR /opt/puter.js/app

# Add source files
COPY . .

# Set permissions
RUN chown -R node:node /opt/puter.js/app
USER node

# Install node modules
RUN npm cache clean --force \
    && npm install

EXPOSE 8080


CMD [ "npm", "start" ]
