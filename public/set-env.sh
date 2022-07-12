#!/bin/sh

# Substitute container environment into production packaged react app
# CRA does have some support for managing .env files, but not as an `npm build` output

# To test:
# docker run --rm -e API_URI=http://localhost:5000/api -e CONFLUENCE_URI=https://confluence.evilcorp.org -e INTRANET_URI=https://intranet.evilcorp.org -it -p 3000:80/tcp dam-frontend:latest

echo "Setting environment variables..."

cp -f /usr/share/nginx/html/runtime-env.example.js /tmp

if [ -n "$PORT" ]; then
sed -i -e "s|REPLACE_PORT|$PORT|g" /tmp/runtime-env.example.js
fi

if [ -n "$API_URL" ]; then
sed -i -e "s|REPLACE_API_URL|$API_URL|g" /tmp/runtime-env.example.js
fi

if [ -n "$FIREBASE_API_KEY" ]; then
sed -i -e "s|REPLACE_FIREBASE_API_KEY|$FIREBASE_API_KEY|g" /tmp/runtime-env.example.js
fi

if [ -n "$FIREBASE_AUTH_DOMAIN" ]; then
sed -i -e "s|REPLACE_FIREBASE_AUTH_DOMAIN|$FIREBASE_AUTH_DOMAIN|g" /tmp/runtime-env.example.js
fi

if [ -n "$FIREBASE_PROJECT_ID" ]; then
sed -i -e "s|REPLACE_FIREBASE_PROJECT_ID|$FIREBASE_PROJECT_ID|g" /tmp/runtime-env.example.js
fi

if [ -n "$FIREBASE_STORAGE_BUCKET" ]; then
sed -i -e "s|REPLACE_FIREBASE_STORAGE_BUCKET|$FIREBASE_STORAGE_BUCKET|g" /tmp/runtime-env.example.js
fi

if [ -n "$FIREBASE_MESSAGING_SENDER_ID" ]; then
sed -i -e "s|REPLACE_FIREBASE_MESSAGING_SENDER_ID|$FIREBASE_MESSAGING_SENDER_ID|g" /tmp/runtime-env.example.js
fi

if [ -n "$FIREBASE_APP_ID" ]; then
sed -i -e "s|REPLACE_FIREBASE_APP_ID|$FIREBASE_APP_ID|g" /tmp/runtime-env.example.js
fi

if [ -n "$FIREBASE_MESUREMENT_ID" ]; then
sed -i -e "s|REPLACE_FIREBASE_MESUREMENT_ID|$FIREBASE_MESUREMENT_ID|g" /tmp/runtime-env.example.js
fi

if [ -n "$GENERATE_SOURCEMAP" ]; then
sed -i -e "s|REPLACE_GENERATE_SOURCEMAP|$GENERATE_SOURCEMAP|g" /tmp/runtime-env.example.js
fi

cat /tmp/runtime-env.example.js > /usr/share/nginx/html/runtime-env.js
# exec "$@"
echo "done"

# nginx -g "daemon off;"
