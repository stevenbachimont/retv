#!/bin/sh
cd /usr/src/app
npm run dev:client &
npm run dev:server &
wait