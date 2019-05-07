# rv-app-frontend

[![Build Status](https://travis-ci.org/ohtu2018-rv/rv-app-frontend.svg?branch=develop)](https://travis-ci.org/ohtu2018-rv/rv-app-frontend) [![codecov](https://codecov.io/gh/ohtu2018-rv/rv-app-frontend/branch/develop/graph/badge.svg)](https://codecov.io/gh/ohtu2018-rv/rv-app-frontend)

## Introduction

This repository contains source code for the new RV, coded during University course 'Software development project, Spring 2018'

![alt text](https://raw.githubusercontent.com/ohtu-ohjaajat/OhTuHistory/master/rv-tuoteselain.png)

Production URL for the application is https://rv-frontend.herokuapp.com, while staging can be found at https://rv-frontend-dev.herokuapp.com.

Please login with ```normal_user::hunter2``` to use the application.

## New updated starting instructions May 2019

### On the first time

- install node.js
- install npm
- install docker
- add your user to the docker group
- install docker-compose
- install vs code
- install plugins to vs code
- clone backend from github
- clone frontend from github
- run npm install in backend
- run npm install in frontend
- create a working .env into frontend
- run docker-compose up in backend
- run npm run db-migrate in the backend container
- run npm run db-seed in the backend container
- run npm start in frontend

### On every time you open the project

- run docker-compose up in backend
- run npm start in frontend

## Old instructions below

## How to get started

1. Clone the repo
2. Install Yarn (if not installed before)
3. `yarn install` to install project dependencies
4. Create a [.env](https://github.com/motdotla/dotenv) file and define in it the variable `REACT_APP_BACKEND_URL` that points to backend server's address
5. `yarn start` for starting the app, `yarn storybook` when developing modules or `yarn styleguide` when creating documentation.

## How to build

Run `yarn build` to build the project. This will create a production-optimized build to ```build``` folder.

## Building with docker

1. Clone the repo
2. Run `chmod +x ./build-docker.sh` and then `./build-docker-sh`
3. Run `chmod +x ./run-docker.sh` and then `./run-docker-sh`

The Dockerfile defaults to `http://localhost:3000` as the back-end URL. You can customize the port of the front-end by starting the container manually with the command `docker run -p PORT:5000 -d --env-file=.env --name rv-app-container rv-app-frontend` (Replace PORT)

## Documentation

For UI component documentation, please click [this link](http://htmlpreview.github.io/?https://github.com/ohtu2018-rv/rv-app-frontend/blob/develop/styleguide/index.html)

## Tech

This is a JavaScript application powered by React. React Redux is used to handle the app's state, with the help of redux-thunk for asynchronous actions. UI components do not use external styling rules, so every UI component you see in this project is styled from scratch.

Testing of UI components is made with Enzyme & Jest, and Redux store is mocked with redux-mock-store.

## Development

### UI component development

When developing UI components, use React Storybook. It allows the development of single UI components instead of adding a new component to the application and develop it 'live'.

### UI component testing & documentation

Write tests as new code is written to make sure that each UI component gets tested throughfully. New UI components shall also be documented on the fly, with the help of React Styleguide.

### ESLint & Stylelint

Code must pass linters in order to be commited. **When a commit is made, ESLint and Stylelint will make sure that styling guidelines are followed.** The commit will not go through, if even one error is detected.

#### Scripts

Use these scripts to help yourself in development.

- ```yarn lint-js``` lints JavaScript files.
- ```yarn fix-js``` lints and fixes potential code issues in JavaScript files.
- ```yarn lint-css``` lints SCSS files.
- ```yarn fix-css``` lints and fixes potential code issues in SCSS files.

**If you want to use npm, replace ```yarn``` command with ```npm run-script```.**

### Git Flow

New features or fixes must have a branch. Pushing directly to develop or master is not allowed (though certain emergency cituations do not follow this rule) [See this link on how to use Git Flow.](DEVELOPMENT.md)

### Testing practices

When developing, update snapshot-tests regularly and create other tests when needed to do so. Use Jest to write tests and mocks.

## Build pipeline

When code is pushed to GitHub and a pull request is made to either ```develop``` or ```master``` branch, Travis CI will run tests for the project and deploy it to Heroku, if all test have passed.

## Project Structure

```
src/
  index.js
    Setups the project, combines reducers to a store.
  app.js
    Renders all other components.
  __tests__/
    Contains all tests.
  services/
    Contains all communication with backend.
  reducers/
    Contains Redux-implementations. Most of functionality stored here.
  components/
    animations/
    buttons/
    forms/
    helpers/
      Constains helpers for styling.
    loaders/
      Contains styled loading icons.
    notifications/
    pages/
      Contains main views. ~Login, Mainpage
    sections/
      Contains all structural elements.
```

## Component rendering tree

```
App
    NotificationDrawer
        SuccessNotification
        ErrorNotification
        PurchaseNotification
            SuccessNotification
    LoginPage
        LoginHeader
        LoginForm
            SuccessBtn
        TopBalanceUsers
    RegistrationPage
        LoginHeader
        RegisterForm
            SuccessBtn
    MainPage
        Header
            DangerBtn
                Loader
            BasicBtn
                Loader
            Margin
        Content
            FeaturedProducts
            Terminal
```


## License

This project is licensed with GNU GPL v2 license.
