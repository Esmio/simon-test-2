#!/usr/bin/env bash
npm version $1 && \
git commit . -m "deploy" \
git push origin master:deploy