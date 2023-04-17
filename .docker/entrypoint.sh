#!/bin/bash

yarn
yarn typeorm -- -d /src/shared/infra/typeorm/index.ts migration:run
yarn dev
