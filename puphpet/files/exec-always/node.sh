#!/bin/bash

forever stopall

cd /home/vagrant/web
npm install
bower install --allow-root --config.interactive=false
grunt dist
forever start --uid "web" --append --watch app.js

cd /home/vagrant/api
npm install
forever start --uid "api" --append --watch app.js

service apache2 restart
