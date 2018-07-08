# Welcome to Nodepop

Nodepop is an API made with Node.js

## Installation

To install this API follow the next sections

### Dependencies

- Run `$ npm install` for installing all API's dependencies.

### Database

- Run `$ mongod` to start a MongoDB instance in your machine.

- Then, open a new terminal a run `$ npm run installDB` to load the mongoDB database.

- Use `$ npm run dev` if you are a developer and you want to test the API.

## Quality Assurance

This API has passed ESLint code quality linting.
The rules for code linting applied to this API are in `.eslintrc.json` file.

## API Use Cases

You must be logged in to make a request to this API.

### Users

- Create an user account -> `POST http://localhost:3000/apiv1/users/authenticate/signup` with `{ name: YOUR_USERNAME, email: YOUR_EMAIL, key: YOUR_PASSWORD }`

- Login -> `POST http://localhost:3000/apiv1/users/authenticate/login` with `{ email: YOUR_EMAIL, key: YOUR_PASSWORD }`

This operations will respond with a JSON that contains the user's token.

### Advertisements

- List all the advertisements in the DB -> `GET http://localhost:3000/apiv1/advertisements?token=TOKEN` 

- Pagination -> `GET http://localhost:3000/apiv1/advertisements?skip=0&​limit​=2&token=TOKEN` 

- Sort -> `GET http://localhost:3000/apiv1/advertisements?sort=FIELD&token=TOKEN` 

- Search by fields -> `GET http://localhost:3000/apiv1/advertisements?name=NAME&token=TOKEN price=PRICE tag=TAG isForSale=BOOL`

- Sort prices -> `GET http://localhost:3000/apiv1/advertisements?price=QUANTITY&token=TOKEN 10-50 10- -50`

- Get all current tags -> `GET http://localhost:3000/apiv1/advertisements/tags?token=TOKEN`


