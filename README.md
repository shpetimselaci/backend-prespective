## Architecture
We are using a modular MVC-Service architecture. You can pretty much notice that by glancing the folder structure. The whole purpose of the modular architecture is that in the future you can potentially just work on that module and nothing will be affected as it does not know anything of other modules.

## Folder structure

```
├── Dockerfile
├── README.md
├── compose.yaml
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── config (includes server config such as env, logger)
│   │   ├── env.ts
│   │   └── logger.ts
│   ├── db  (db setup things)
│   │   └── connection.ts
│   ├── index.ts
│   ├── interfaces  (typescript interfaces)
│   │   ├── ErrorResponse.ts
│   │   ├── MessageResponse.ts
│   │   └── RequestValidators.ts
│   ├── middlewares  (middlewares related to express which is used by the modules -- could be refactored to a util possibly)
│   │   ├── error-handler.ts
│   │   ├── not-found.ts
│   │   ├── validator.ts
│   │   └── zod-parse-error.ts
│   ├── module (where all modules lie)
│   │   └── users
│   │       ├── controller.ts
│   │       ├── model.ts (mongodb schema)
│   │       ├── route.ts (module related route)
│   │       ├── service.ts
│   │       ├── tests (tests)
│   │       │   └── users.test.ts
│   │       └── validation.ts (body, queryParams, pathParams validation schemas)
│   ├── route.ts (servers main route)
│   ├── routing-registry.ts (where all modules get registered)
│   └── server.ts (where server gets setup)
├── test
│   ├── index.test.ts
│   └── setup.ts // test setup
└── tsconfig.json
```

## Setting things up
If you have docker installed and running, make sure that you have copied the .env.example given to .env using:

```zsh
cp .env.example .env

```
Then to continue run:
```zsh
docker compose build
docker compose up
```

And the server should be up and running!

## Setting things up (2nd option -harder)
Hit `npm i` to install node_modules.

If you happen to get something like:

```
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'backend-test@1.0.0',
npm warn EBADENGINE   required: { node: 'v18' },
npm warn EBADENGINE   current: { node: 'v22.3.0', npm: '10.8.1' }
npm warn EBADENGINE }
```

Make sure to install the version if you're using [nvm](https://github.com/nvm-sh/nvm):

```zsh
nvm install
nvm use
```

OR go ahead and download the [node](https://nodejs.org/dist/v18.20.4/node-v18.20.4.pkg) version specified in the **engines lock** on **package.json**.

Please to run the server a database must be setup previously. You can use `brew` to run a mongodb instance.
You have a detailed guide [here](https://www.mongodb.com/docs/manual/administration/install-community/).
Run this command to run mongodb:
```zsh
mongod
```

Create a .env from:
```zsh
cp .env.example .env
```
And make sure you've set `DB_URL` to point to your instace.

# Testing

We do not need an instace of mongodb to run things as we use an inmemory mongodb instance.
```zsh
npm run test
```
Each module has tests


## Potential improvements
- ESLINT! Configuring it with prettier and adding a command to point out mistakes in code uniformity
- Graceful shutdowns
- Security packages like helmet
- Better config for other environments rather than development - Possibly commands to copypaste .env or config.json files to ensure that the environments are ran properly


# Backend Engineer Work Sample

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

## Scripts 
`npm start` starts the server

`npm test` executes the tests

## Goal
1. Adjust POST /users that it accepts a user and stores it in a database.
    * The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
   * This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.

Feel free to add or change this project as you like.


