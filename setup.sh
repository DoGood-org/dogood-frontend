#/bin/bash

CONTAINERS=$(docker ps -a | grep 'dogood\|postgres\|redis' | awk '{print $1}')

echo $CONTAINERS

if [ $(echo $CONTAINERS | grep -c 'dogood\|postgres\|redis') -eq 3 ]; then

    echo "All containers already exist. Starting them..."
    docker-compose start server postgres redis

elif [ $(echo $CONTAINERS | grep -c 'dogood\|postgres\|redis') -gt 0 ]; then

    echo "Some containers already exist. Stopping and recreating them..."
    docker-compose stop
    docker-compose rm -f
    docker system prune -f
    docker-compose up -d

else
    echo "No containers exist. Creating and starting them..."
    docker-compose up -d
fi


echo "All containers are up and running. Entering the backend container..."
docker exec -it dogood bash