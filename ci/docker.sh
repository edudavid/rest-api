#!/bin/sh
docker build -t edudavid81/rest-api:latest .

docker push edudavid81/rest-api:latest
docker rmi -f edudavid81/rest-api:latest
