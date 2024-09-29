# Setting things up
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


# OLD

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


