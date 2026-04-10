## Description

A to do list to control activities with a automate organization with AI, which user pass the name and description of each task and AI classificate the importance and put a category of each activity.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Modify the database

```bash
# commands base
$ npm run typeorm

# update the database
$ npm run typeorm:up

# return an event in database
$ npm run typeorm:down
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Routes

### Users (/users)

| Method | Route | Description | Body example | Auth |
| --- | --- | --- | --- | --- |
| POST | /signup | Create the user in db | { name: string, email: string, password: string(min: 8) } | No |
| POST | /login | Get the user and create the token | { email: string, password: string(min: 8)} | No |
| GET | /me | Get the informations from user | Without body | Yes |
| DELETE | /me | Delete the user | Without body | Yes |
| PUT | /me | Update all informations from user | { name: string, email: string, password: string(min: 8) } | Yes |
| PATCH | /me | Update a few informations from user | { name: string(optional), email: string(optional), password: string(min: 8, optional) } | Yes |

### Tasks (/tasks)

| Method | Route | Description | Body example | Auth |
| --- | --- | --- | --- | --- |
| POST | /tasks | Create the task and pass to the AI to classificate | { name: string, description: string } | Yes |
| GET | /tasks/:id | Search the task by id | Without body | Yes |
| GET | /tasks | List all tasks(use pagination) | Without body | Yes |
| DELETE | /tasks/:id | Delete a task by id | Without body | Yes |
| PATCH | /tasks/:id | Update part of a task | { name: string(optional), description: string(optional), user: number(optional), complete: boolean(optional) } | Yes |
| PUT | /tasks/:id | Update completely a task | { name: string, description: string, user: number, complete: boolean } | Yes |