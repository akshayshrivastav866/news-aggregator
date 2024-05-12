#!/bin/bash

BUILD_DIR=".scripts/"

#================   Import required files
source "${BUILD_DIR}colors.sh"
source "${BUILD_DIR}global.sh"

# Check system compatibility
if bash "${BUILD_DIR}check-system-compatibility.sh"; then
    source "${BUILD_DIR}parse-cli-inputs.sh"

    #================   Check ENV variable status
    if [ -z "$ENV" ]; then
        echo -e "${YELLOW}:: Info :: Please pass --env parameter.${NC}"
        echo -e "${ORANGE}:: Hint :: ./build.sh --env=<environment>${NC}"
        exit 1
    fi

    #================   Execute docker logic based on inputs
    if [ "$ENV" = "local" ]; then
        source "${BUILD_DIR}local-build.sh"
    else
        echo -e "${RED}:: Error :: Invalid environment \"$ENV\"${NC}"
        echo -e "${ORANGE}:: Hint  :: Supported environments: ${SUPPORTED_ENVIRONMENTS}${NC}"
        exit 1
    fi
fi
