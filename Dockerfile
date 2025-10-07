# use docker build 
FROM node:slim AS dev


WORKDIR /frontend

COPY . /frontend/
RUN apt update -y \
 && apt install -y git \
 && git restore . \
 && npm install 
 


RUN git clone https://github.com/DoGood-org/dogood-backend /backend/  \
 && cd /backend && npm install \ 
 && npx prisma generate \
 && rm -rf /var/lib/apt/lists/* \
 && npm cache clean --force


EXPOSE 5000
EXPOSE 3000

CMD ["/bin/bash"]
