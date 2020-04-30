<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [rv-app-frontend](#rv-app-frontend)
  - [Introduction](#introduction)
  - [Development environment setup (Quick guide)](#development-environment-setup-quick-guide)
    - [On the first time](#on-the-first-time)
    - [On every time you open the project](#on-every-time-you-open-the-project)
  - [Setting up & starting the front-end](#setting-up--starting-the-front-end)
  - [Building the front-end](#building-the-front-end)
  - [Building with docker](#building-with-docker)
  - [Tech](#tech)
  - [Development](#development)
    - [UI component development](#ui-component-development)
    - [UI component testing & documentation](#ui-component-testing--documentation)
    - [ESLint & Stylelint](#eslint--stylelint)
      - [Scripts](#scripts)
    - [GitHub & branches](#github--branches)
    - [Testing practices](#testing-practices)
  - [Build pipeline](#build-pipeline)
  - [Project Structure](#project-structure)
  - [Component rendering tree](#component-rendering-tree)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# rv-app-frontend

[![Build Status](https://travis-ci.org/ohtu2018-rv/rv-app-frontend.svg?branch=develop)](https://travis-ci.org/ohtu2018-rv/rv-app-frontend) [![codecov](https://codecov.io/gh/ohtu2018-rv/rv-app-frontend/branch/develop/graph/badge.svg)](https://codecov.io/gh/ohtu2018-rv/rv-app-frontend)

## Introduction

This repository contains source code for the new RV (Snack kiosk), coded during University course 'Software development project, Spring 2018'

![alt text](https://raw.githubusercontent.com/ohtu-ohjaajat/OhTuHistory/master/rv-tuoteselain.png)

Production URL for the application is https://rv-frontend.herokuapp.com, while staging can be found at https://rv-frontend-dev.herokuapp.com.

Please login with `normal_user::hunter2` to use the application.

## Development environment setup (Quick guide)

This guide gives instructions how to run the RV service as a whole (frontend & backend).

### Requirements

- Node.js installed on your environement.
- Npm installed on your environement.
- Docker installed on your enviroment.
- Docker compose installed on your enviroment.
- Optional: Install `nvm` (Node Version Manager) to quickly switch Node.js versions

### On the first time

Before copy pasting go to the directory where you want the code environement.

#### Backend

```bash
git clone git@github.com:TKOaly/rv-backend.git
cd rv-backend
docker-compose build
docker-compose up
docker-compose run rv-backend npm run db-migrate
docker-compose run rv-backend npm run db-seed
```

#### Frontend

```bash
git clone git@github.com:TKOaly/rv-app-frontend.git
cd rv-app-frontend
npm install
cp .env-example .env
npm start
```

### On every time you open the project

- Run `docker-compose up` in backend
- Run `npm start` in frontend

## Setting up & starting the front-end

1. Clone the repo
2. Run `npm install` to install project dependencies
3. Create a [.env](https://github.com/motdotla/dotenv) file and define in it the variable `REACT_APP_BACKEND_URL` that points to backend server's address
4. Run `npm start` to start the frontend, `npm run storybook` to run storybook.

## Building the front-end

Run `npm run build` to build the project. This will create a production-optimized build to `build` folder.

## Building with docker

1. Clone the repo
2. Run `chmod +x ./build-docker.sh` and then `./build-docker-sh`
3. Run `chmod +x ./run-docker.sh` and then `./run-docker-sh`

The Dockerfile defaults to `http://localhost:3000` as the back-end URL. You can customize the port of the front-end by starting the container manually with the command `docker run -p PORT:5000 -d --env-file=.env --name rv-app-container rv-app-frontend` (Replace PORT)

## Tech

This is a JavaScript application powered by React. React Redux is used to handle the app's state, with the help of redux-thunk for asynchronous actions. UI components do not use external styling rules, so every UI component you see in this project is styled from scratch.

Testing of UI components is made with Enzyme & Jest, and Redux store is mocked with redux-mock-store.

## Development

### UI component development

When developing UI components, use React Storybook. It allows the development of single UI components in an isolated environment instead of adding a new component to the application and develop it 'live'.

### UI component testing & documentation

Write tests as new code is written to make sure that each UI component gets tested throughfully. New UI components shall also be documented on the fly, with the help of React Storybook.

### ESLint & Stylelint

Code must pass linters in order to be commited. **When a commit is made, ESLint and Stylelint will make sure that styling guidelines are followed.** The commit will not go through, if even one error is detected.

#### Scripts

Use these scripts to help yourself in development.

- `npm run lint-js` lints JavaScript files.
- `npm run fix-js` lints and fixes potential code issues in JavaScript files.
- `npm run lint-css` lints SCSS files.
- `npm run fix-css` lints and fixes potential code issues in SCSS files.

### GitHub & branches

New features or fixes must have a branch. Pushing directly to develop or master is not allowed (though certain emergency situations do not follow this rule)

### Testing practices

- Update snapshot tests regularly
- Ceate other tests when needed to do so
- Use Jest to write component tests
- Use Sinon to mock API requests and fn's.

## Build pipeline

When code is pushed to GitHub and a pull request is made, Travis CI will run tests for the project.

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
