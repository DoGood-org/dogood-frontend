#!/bin/bash

kill -9 $(lsof -t -i:5000)

cd /backend

git pull origin develop

npx prisma generate && npx prisma migrate dev

npm run dev &