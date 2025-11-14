#!/bin/bash
echo "* */4 * * * ./update.sh" >> /etc/crontab 
chmod +x update.sh
git clone https://github.com/DoGood-org/dogood-backend /backend 
cd /backend && npm install && npx prisma generate && rm -rf /var/lib/apt/lists/* && npm cache clean --force && npx prisma migrate dev
npm run dev &