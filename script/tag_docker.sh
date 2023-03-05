#!/bin/bash

TAG_DOCKER_BACK=$(curl -s https://registry.hub.docker.com/v2/repositories/lucasmoreno82/back-nodejs/tags/\?page_size=1 | jq -r '.results[].name')
TAG_DOCKER_FRONT=$(curl -s https://registry.hub.docker.com/v2/repositories/lucasmoreno82/front-reactjs/tags/\?page_size=1 | jq -r '.results[].name')

sed -i.bak "s/TAG_DOCKER_BACK=.*/TAG_DOCKER_BACK=$TAG_DOCKER_BACK/" .env
sed -i.bak "s/TAG_DOCKER_FRONT=.*/TAG_DOCKER_FRONT=$TAG_DOCKER_FRONT/" .env