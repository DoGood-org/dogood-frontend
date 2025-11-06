# Build and start docker containers
$containers = docker ps -a --format '{{.Names}}'

if ($containers -contains "dogood" -and $containers -contains "postgres" -and $containers -contains "redis") {
    Write-Host "All containers already exist. Starting them..."
    docker-compose start dogood postgres redis
}
elseif ($containers -contains "dogood" -or $containers -contains "postgres" -or $containers -contains "redis") {
    docker-compose stop
    docker-compose rm -f
    docker system prune -f
    docker-compose up -d
}
else{
    docker-compose up -d
}


