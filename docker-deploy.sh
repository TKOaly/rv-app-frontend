#!/bin/bash

# Tag as develop
if [ $TRAVIS_BRANCH = "develop" ] && [ $TRAVIS_PULL_REQUEST = "false" ]
then
    echo "Building Docker image..."
    docker build . -t rv-frontend
    echo "Pushing image to Docker registry..."
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
    docker tag rv-frontend tkoaly/rv-frontend:latest-dev
    docker push tkoaly/rv-frontend:latest-dev
fi

# Tag as latest
if [ $TRAVIS_BRANCH = "master" ] && [ $TRAVIS_PULL_REQUEST = "false" ]
then
    echo "Building Docker image..."
    docker build . -t rv-frontend
    echo "Pushing image to Docker registry..."
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
    docker tag rv-frontend tkoaly/rv-frontend:latest
    docker push tkoaly/rv-frontend:latest
fi