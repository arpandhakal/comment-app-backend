<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

Comment Application Backend is created using Nestjs, a typescript framework and Mongodb. Mongoose is used as an orm here. The application makes features like adding a comment and fetching a number of comments to the authorized user. Authorization is handle through Jsonwebtokens. User can login/register to post and view the comments. 

## Api Documentation 

Swagger Configuration is done in the project for clear api references and collection. Please use 'baseURL'/api to access the swagger UI.
![image](https://github.com/arpandhakal/comment-app-backend/assets/46821825/8ac597bf-22b4-4389-b7cb-80b5cce861b0)

## Overview

![image](https://github.com/arpandhakal/comment-app-backend/assets/46821825/d31a332f-bdfa-45d0-b668-29fc69a31414)

## Running the app with docket 

1. Clone the repository : git clone <url>
2. docker build -t <imagename> .
3. docker run -p 3001:3001
4. Access the application 


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

# production mode
$ npm run start:prod
```



Nest is [MIT licensed](LICENSE).
