#!/bin/bash

# Downloading NodeJS 12.x LTS package
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

# Installing the NodeJS package
sudo apt-get install nodejs

# Checking NodeJS Versions
echo "NODEJS VERSION CHECK ====================>>>>>"
node -v
echo "NPM VERSION CHECK =====================>>>>>"
npm -v

