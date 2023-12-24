## Author

Matheus Mendes de Morais Fraresso

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
# will test the id to sort url function
$ npm run test

# e2e tests
# will test some HTTP calls
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Seed

```bash
# seeds database with 100 urls
$ npm run seed
```

## License

# Nest is [MIT licensed](LICENSE).

## url_shortener

# description

API that shortens URL's

## usage

# First steps

1. install dependencies with npm i
2. seed database with npm run seed or execute the API with npm run start, the process will use the TCP port 3000

# Adding a URL

To add a URL, using a client like postman or insomnia, you can execute a POST method on the endpoint http://localhost:3000/routes, the post body has to have a long_url key with a valid URL to be persisted. ie:

POST -> http://localhost:3000/routes
Body-> {"long_url":"https://yahoo.com"}

The response will return a object with a body and a message property, the body will contain the data persisted on the database and the message will contain the sortened url, for the example above we would have :

# Fetching short
