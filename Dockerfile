FROM node:8.9.4
RUN mkdir /practice_docker
ADD . /practice_docker
WORKDIR /practice_docker
RUN npm i
EXPOSE 80 3306
CMD ["npm", "start"]