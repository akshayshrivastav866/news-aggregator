#!/bin/bash

if bash "${BUILD_DIR}setup-env-file.sh"; then
    echo -e "\n${YELLOW}###################### Running docker build(s)${NC}\n"

    echo -e "Build using ${PURPLE}docker compose build${NC}\n"
    docker compose build
fi
