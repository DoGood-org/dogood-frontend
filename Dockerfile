# use docker build 
FROM node:22-slim AS dev


WORKDIR /frontend

COPY . /frontend/
RUN apt update -y \
 && apt install -y git \
 && npm install 

EXPOSE 5000
EXPOSE 3000

CMD ["/bin/bash"]
