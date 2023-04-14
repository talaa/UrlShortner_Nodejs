FROM  node:alpine

WORKDIR /Code/app
COPY package*.json .

RUN npm install

COPY . .

CMD ["npm","start"]