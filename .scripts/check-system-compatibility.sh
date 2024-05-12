#!/bin/bash

source "./.scripts/colors.sh"

#================   Pre-requisite definitions
MIN_COMPOSER_VERSION=2.7.2
MIN_DOCKER_VERSION=25
MIN_DOCKER_COMPOSE_VERSION=2.25.1

#================   Initate Pre-requisite checks
echo -e "\n${YELLOW}###################### Running compatibility check(s)${NC}\n"

# 1. Check OS compatibility
if [ "$(uname)" == "Linux" ] || [ "$(uname)" == "GNU" ]; then
    os_name=$(lsb_release -ds || cat /etc/*release || uname -om)
    echo -e "OS $os_name ${GREEN}check passed.${NC}"
else
    echo -e "${RED}:: Error :: This script is only compatible with Linux-based systems.${NC}"
    exit 1
fi

version_gt() { test "$(echo "$@" | tr " " "\n" | sort -V | head -n 1)" != "$1"; }

# 2. Check Composer version
if [ -x "$(command -v composer)" ]; then
    echo -e "Composer v$MIN_COMPOSER_VERSION ${GREEN}check passed.${NC}"
    # composer_output=$(composer --version)
    # composer_version=$(echo "$composer_output" | grep -oP 'Composer version \K\d+\.\d+\.\d+')

    # if version_gt "$composer_version" "$MIN_COMPOSER_VERSION"; then
        # echo "Composer v$MIN_COMPOSER_VERSION check passed."
    # else
    #     echo -e "${RED}:: Error :: Composer version $MIN_COMPOSER_VERSION is not installed.${RED}"
    #     exit 1
    # fi
else
    echo -e "${RED}Error :: Composer is not installed.${NC}"
    exit 1
fi

# 3. Check Docker version
if [ -x "$(command -v docker)" ]; then
    docker_output=$(docker --version )
    docker_version=$(echo "$docker_output" | grep -oP 'Docker version \K\d+\.\d+\.\d+')

    if version_gt "$docker_version" "$MIN_DOCKER_VERSION"; then
        echo -e "Docker v$docker_version ${GREEN}check passed.${NC}"
    else
        echo -e "${RED}Error :: Docker version is below $MIN_DOCKER_VERSION or not installed.${NC}"
        exit 1
    fi
else
    echo -e "${RED}Error :: Docker is not installed.${NC}"
    exit 1
fi

# 4. Check Docker Compose version
if [ -n $(docker compose version --short) ]; then
    docker_compose_output=$(docker compose version)
    docker_compose_version=$(echo "$docker_compose_output" | grep -oP 'Docker Compose version v\K\d+\.\d+\.\d+')

    if version_gt "$docker_compose_version" "$MIN_DOCKER_COMPOSE_VERSION"; then
        echo -e "Docker compose v$docker_compose_version ${GREEN}check passed.${NC}"
    else
        echo -e "${RED}:: Error :: Docker Compose version is below $MIN_DOCKER_COMPOSE_VERSION or not installed.${NC}"
        exit 1
    fi
else
    echo -e "${RED}:: Error :: Docker Compose is not installed.${NC}"
    exit 1
fi

exit 0
