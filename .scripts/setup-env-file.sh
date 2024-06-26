#!/bin/bash

source "./.scripts/colors.sh"

echo -e "\n${YELLOW}###################### Generating updated .env file${NC}\n"

global_env=".env-global"
backend_env="./backend/.env"
frontend_env="./frontend/.env.development"
merged_env=".env"

# Check if .env exists on root folder and delete it
if [ -f "$merged_env" ]; then
    rm "$merged_env"
fi

# Merge all .env files as one file in root directory
echo "#================   Global env file contents" >> "$merged_env"
cat "$global_env" >> "$merged_env"
echo "" >> "$merged_env"

echo "#================   Backend env file contents" >> "$merged_env"
cat "$backend_env" >> "$merged_env"
echo "" >> "$merged_env"

echo "#================   Frontend env file contents" >> "$merged_env"
cat "$frontend_env" >> "$merged_env"

# Assign read and execute permissions to the merged .env file
chmod +rx "$merged_env"

echo -e "New '$merged_env' file ${GREEN}created with defined permissions.${NC}"

exit 0
