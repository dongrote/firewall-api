#!/bin/sh

npm --prefix server i
docker build . -t firewall-api:latest
