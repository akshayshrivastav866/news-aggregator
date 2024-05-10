#!/bin/bash

ENV=""
STATUS=""
DOCKER_STATUS=""
ENV_FILE_STRINGS=""
SUPPORTED_ENVIRONMENTS="local"

#================   Define CLI message colors
RED='\033[1;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
ORANGE='\033[0;33m'
PURPLE='\033[1;35m'

#================   Parse CLI inputs
for arg in "$@"
do
    case $arg in
        --env=*)
            ENV="${arg#*=}"
            shift
            ;;
        --status=*)
            STATUS="${arg#*=}"
            shift
            ;;
        *)
            # Ignore unknown arguments
            ;;
    esac
done

#================   Check ENV variable status
if [ -z "$ENV" ]; then
    echo -e "${YELLOW}:: Info :: Please pass --env parameter.${YELLOW}"
    echo -e "${ORANGE}:: Hint :: ./build/build.sh --env=<environment>${ORANGE}"
    exit 1
fi

#================   Build or start container/image
if [ -z "$STATUS" ] || [ "$STATUS" = "start" ]; then
    DOCKER_STATUS="up --remove-orphans"
elif [ "$STATUS" = "build" ]; then
    DOCKER_STATUS="build"
fi


#================   Execute docker logic based on inputs
if [ "$ENV" = "local" ]; then
    ENV_FILE_STRINGS="--env-file backend/.env --env-file frontend/.env.development"

    echo -e "${PURPLE}:: Building Using :: docker compose $ENV_FILE_STRINGS ${DOCKER_STATUS}${PURPLE}"
    docker compose $ENV_FILE_STRINGS ${DOCKER_STATUS}
else
    echo -e "${RED}:: Error :: Invalid environment \"$ENV\"${RED}"
    echo -e "${ORANGE}:: Hint  :: Supported environments: ${SUPPORTED_ENVIRONMENTS}${ORANGE}"
    exit 1
fi
