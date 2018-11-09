FROM node:10.13.0-alpine
WORKDIR /app

COPY packages/backend .
COPY packages/frontend/dist ./public/
RUN npm install

ENV PORT=4000
ENV NODE_ENV=production
EXPOSE 4000

CMD npm start