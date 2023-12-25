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

Invalid urls are filtered by searching them with the fetch api, problematic urls will not be persisted

The response will return a object with a body and a message property, the body will contain the data persisted on the database and the message will contain the sortened url, for the example above we would have :

```json
{
  "body": {
    "long_url": "https://yahoo.com",
    "short_url": "1",
    "title": "",
    "counter": 0,
    "_id": "65888aba985e51019d45826c",
    "__v": 0
  },
  "message": "Shortened url : 1"
}
```

# Fetching short url

To fetch a sortened url, use the GET method with the endpoint http://localhost:3000/routes/:short_url with the :short_url being the url that you want to fetch. The APi will return an Object with a body containg the full route information, and a message detailing the original URL

The Above example have the fallowing result if fetched

```json
{
  "body": {
    "_id": "65888aba985e51019d45826c",
    "long_url": "https://yahoo.com",
    "short_url": "1",
    "title": "Yahoo | Mail, Weather, Search, Politics, News, Finance, Sports & Videos",
    "counter": 0,
    "__v": 0,
    "id": 1
  },
  "message": "The original URL is: https://yahoo.com"
}
```

# Top 100

To fetch the 100 most used requests, ypu can use the GET method with the endpoint http://localhost:3000/routes and will result in :

```json
[
  {
    "URL": "https://yahoo.com",
    "SHORT URL": "1",
    "USES": 15
  },
  {
    "URL": "https://www.gstatic.com",
    "SHORT URL": "A",
    "USES": 0
  },
  {
    "URL": "https://www.feedburner.com",
    "SHORT URL": "g",
    "USES": 0
  }...
]
```

## Information

# Background title job

Cron was used to schedule a job every 10 seconds fetching all routes from the database and urlMetadata was used to parse the web page and find it's title.

# Database

For this project I have choosen MongoDb with Mongoose ODM since it's easyer to deploy and has a nice interation with NestJs (https://docs.nestjs.com/techniques/mongodb), it also negates the need for migrations, making it easier for the end user (in this case you guys)

## The Solution

# The alphabet

This was a little hard to decide, I knew that the more characters existing in the alphabet the more efficient the shortener algorithm would be, so I thour about several solutions

1. ASCII table-> having 256 character alphabet, the ASCII table seemed a nice choice at the beggining. But the existence of several characters that would break the URL made this a bad choice for the task
2. HTTP url encode characters(https://www.w3schools.com/tags/ref_urlencode.ASP) -> Thisreference provided me with the most characters, but then found another problem that the ASCII sulutions would face too. Some characters could not be typed with normal keyboards, or needed some pretty convoluted shortcuts to be used. So also thinking about testing and user friendliness i stepped away from this solution
3. Normal [a-z] alphabet with, but implementing huffman compression. The problem with this solution is that for the compression to be worth it, I would have to use a less diverse alphabet, and the compression would compress only about 38% (https://web.stanford.edu/class/archive/cs/cs106b/cs106b.1176/assnFiles/assign6/huffman-encoding-supplement.pdf) of the string size. But since the options of encoding rise exponentially adding more characters, It would be more efficient to use a bigger alphabet (that would be more difficult to compress). The are some cases that the compression would be better, such as several equal characters back to back, but this cases are not common.
4. So the final alphabet chosen was all the characters that could be typed in a common western keyboard, using and nos using the SHIFT and AltGr functions, having the final character count being 96. With this alphabet we could store 96^n, n being the size of the short url, and the user would be able to fetch the urls without searching for characters online or breaking the url on search

# Url Shortener algorithm
