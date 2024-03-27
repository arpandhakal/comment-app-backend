FROM node:current-alpine

# Set src/app as work directory
WORKDIR src/app

COPY package*.json ./

RUN npm install

# Copy All project files
COPY . .

#build 
RUN npm run build


EXPOSE 3001

# Serve the build
CMD ["npm", "run", "start:dev"]
