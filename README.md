# Bowling score app
Run tests

```$ npm test```

Build a docker image and run it, app will be running on port 4008

```$ ./build && ./run```

## Backend
Entry point is `packages/backend/src/server.js`

## Frontend
Frontend starts in `packages/frontend/src/index.js`,
directives in `packages/frontend/src/directives/` is not currently used, only the (S)CSS from there.

Frontend is built with angularsjs, scss and webpack and is unfortunatly not tested properly.

