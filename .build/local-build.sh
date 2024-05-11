#!/bin/bash

backend_env="./backend/.env"
frontend_env="./frontend/.env.development"
merged_env=".env"

# Check if .env exists on root folder and delete it
if [ -f "$merged_env" ]; then
    rm "$merged_env"
fi

# Merge contents of frontend and backend .env files to root directory .env file
echo "#================   Backend env file contents" >> "$merged_env"
cat "$backend_env" >> "$merged_env"
echo "" >> "$merged_env"
echo "#================   Frontend env file contents" >> "$merged_env"
cat "$frontend_env" >> "$merged_env"

# Assign read and execute permissions to the merged .env file
chmod +rx "$merged_env"

echo -e "${GREEN}:: Info         :: New file '$merged_env' created with defined permissions.${GREEN}"
echo -e "${PURPLE}:: Build Using :: docker compose ${DOCKER_STATUS}${PURPLE}"
docker compose $DOCKER_STATUS
