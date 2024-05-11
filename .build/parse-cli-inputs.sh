#!/bin/bash

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