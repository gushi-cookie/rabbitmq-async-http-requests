#!/bin/bash
declare empty_node_container=false

while getopts "e" opt; do
    case ${opt} in
        e ) empty_node_container=true;;
        \? )
            printf "Invalid Option: -${OPTARG}\n" 1>&2
            exit 1
        ;;
    esac
done
shift $((OPTIND -1))


if [[ $empty_node_container == "true" ]]; then
    docker run  -it --rm \
                --user 1000:1000 \
                --workdir /app \
                --volume $(pwd):/app \
                --name running-mbs-core \
                --publish 127.0.0.1:8080:5173 \
                node bash
                
else
    docker run  -it --rm \
                --user 1000:1000 \
                --volume $(pwd):/app \
                --name running-mbs-core-sandbox \
                --publish 127.0.0.1:8080:5173 \
                mbs-core
fi
