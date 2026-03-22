# use docker build 
FROM node:22-slim AS dev


WORKDIR /frontend

COPY . /frontend/
RUN apt update -y \
 && apt install -y git \
 && npm install 

RUN apt install -y cron lsof
EXPOSE 5000

CMD ["/bin/bash"]
