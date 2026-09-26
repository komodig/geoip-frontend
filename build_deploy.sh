#!/bin/bash
if [ -d ../rs-frontend ]; then
    echo "building frontend dist"
    npm run build
    echo "copy build artefacts"
    cp -rf dist/* ../rs-frontend/dist/
    echo "commit + push ../rs-frontend"
    cd ../rs-frontend && git add . && git commit -m "updated frontend build" && git push
else
    echo "rs-backend repo not found locally"
fi

