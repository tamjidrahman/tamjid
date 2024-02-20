FROM node:20-alpine
WORKDIR /app

# Install PM2 globally
RUN npm install --global pm2


COPY package.json package-lock.json ./
RUN npm install --production

COPY . .
RUN npm run build

USER node

EXPOSE 3000

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]