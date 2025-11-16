This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.


## Set up using Docker (dev environment)

Requirements:
 - Docker (Desktop version preferably).
 - 4gb of free space.

First of all create `.env` file as shown in `.env.compose.example`, then use setup script. 

```bash
# Allow setup for Windows 
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
./setup.ps1 # For Windows Users (Powershell)
```

```bash
./setup.sh            # For Linux and MacOS (or Zsh/Bash users)
chmod 777 setup.sh    # UNIX always wants rights for execution. You need to do it by yourself
```

In case of container sutdown simply re-execute `setup.sh` or `setup.ps1`. 

### Connecting to Docker's db 

Containerized database listens on port `5444`, and from local machine you should connect to specifically this port.   
For your local db you are connecting as usual. Through port `5432`. 
It is done like this to avoid connection conflict between local and container databases via the same port. 

### Entering containerized environment

Now the entire project is set up inside your local machine. For entering server's shell simply enter what's below:

```bash
docker exec -it dogood-front bash
```

For developing inside it simply attach to `dogood-front` container via IDE. 
Everything is set up already. If you want to ping to other services inside container, then simply call them by name (not IP).
Environment already contains both frontend and backend for wirking within it.

```bash
cd /frontend # for opening frontend
cd /backend  # for opening backend
```
For starting either `backend` or `frontend` simply enter `npm run dev` in one of those directories and everything is set up.

In case backend needs to be restarted, use `update.sh` inside container.
If there is a need to forcefully stop backend - use this command:

```bash
kill -9 $(lsof -t -i:5000) # stop backend inside container
```


## Removing cluster after work is finished

For removing cluster after work (project is deployed), before cleaning cache you should delete all containers, images and volumes (same order), after that execute this command:

```bash
docker system prune -af # cleaning cache
```


## Misc: connecting to NPX Prisma

```bash
npx prisma studio
```


### Pushing changes to remote repo

All changes made inside Docker are applied to your local repo. Simply push from local as usual, but make changes inside docker. 


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.
