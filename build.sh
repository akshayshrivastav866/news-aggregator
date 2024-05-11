#!/bin/bash

BUILD_DIR=".build/"

# Import required files
source "${BUILD_DIR}colors.sh"
source "${BUILD_DIR}global.sh"
source "${BUILD_DIR}parse-cli-inputs.sh"

#================   Check ENV variable status
if [ -z "$ENV" ]; then
    echo -e "${YELLOW}:: Info :: Please pass --env parameter.${YELLOW}"
    echo -e "${ORANGE}:: Hint :: ./build.sh --env=<environment>${ORANGE}"
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
    source "${BUILD_DIR}local-build.sh"
else
    echo -e "${RED}:: Error :: Invalid environment \"$ENV\"${RED}"
    echo -e "${ORANGE}:: Hint  :: Supported environments: ${SUPPORTED_ENVIRONMENTS}${ORANGE}"
    exit 1
fi
