# Golb

A blogging platform for Node.js + Express + MongoDB.

## How to use

Install Golb via npm.

```
npm install --save golb
```

Create a javascript file like:

```js
// index.js

const golb = require('golb');

const config = {};

golb.start(config).catch(e => console.error(e.message));
```

Run the script file:

```
node index.js
```

## API

### golb.start(config)

Start the Golb web server. The method takes an object as an argument and returns a Promise object.

You can pass parameters below as attributes of the config object:

| param name        | default                       |
|-------------------|-------------------------------|
| webPort           | 80                            |
| webHost           | "localhost"                   |
| dbName            | "glob"                        |
| dbPort            | 27017                         |
| dbHost            | "localhost"                   |
| adminApiRoot      | "/admin-api"                  |
| publicApiRoot     | "/public-api"                 |
| adminRoot         | "/admin"                      |
| publicRoot        | "/"                           |
| adminEmail        | "change@myemail.com"          |
| adminPassword     | "changepassword"              |
| adminDisplayName  | "Admin"                       |
| adminSlug         | "admin"                       |
| adminApiHostname  | the value of webHost          |
| adminApiPort      | the value of webPort          |
| adminApiBasename  | the value of adminApiRoot     |
| publicApiHostname | the value of webHost          |
| publicApiPort     | the value of webPort          |
| publicApiBasename | the value of publicApiRoot    |

### golb.stop()

Stop the web server if it's started. The method returns a Promise object.