#!/bin/sh
docker run -p 5000:5000 -d --env-file=.env --name rv-app-container rv-app-frontend
