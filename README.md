# Care U



## Installation

```bash
$ yarn
```

## Running the app

```bash
$ cp .env.example .env
$ docker-compose up --build

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
# Api
```
host: localhost:$port/api
```
## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```