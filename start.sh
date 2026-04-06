#!/bin/bash
cd "$(dirname "$0")"
npm run build
pm2 start ecosystem.config.js
