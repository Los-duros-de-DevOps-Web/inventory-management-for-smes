FROM node:19-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN cd src && npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]