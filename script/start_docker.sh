#!/bin/bash

rm .env.bak

# Exécute le script tag_docker.sh en arrière-plan
source ./script/tag_docker.sh &

# Attend la fin de l'exécution du script tag_docker.sh
wait $!

# Exécute docker-compose up une fois que le script tag_docker.sh est terminé
docker-compose up