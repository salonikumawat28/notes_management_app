# Notes Management App
This application creates a management solution for the addition, modification, and deletion of notes.

# Creating quickstart projects
## Client
For the Frontend of the notes application, ReactJS is used. The initial React app is generated using the following command:
```
npx create-react-app client
```

## Server
Express.js is utilized for the Backend of the notes application. The application skeleton is generated using the following command:
```
npx express-generator server
npm install
```

# Architecture
## Server API
### API Router
URL router contains simple URLs and routes them to appropriate controller methods.
For example:
```
router.post('/', usersController.createUser);
```
### API Controller
Controller of an API involves a series of well-defined steps. Here's a breakdown of the generic steps involved in an API controller:
1. Validation:
- Input Validation: Validate the request, including URL parameters, query parameters, and the request body to ensure the input data meets the expected format.
- Error Handling: If validation fails, send error message with error status code. 

2. Authentication:
- Authenticate the user: If the API requires authentication, verify the provided credentials. 
- Authorize the user: Authorize the authenticated user to ensure that the user has access to the corresponding resource.
- Authentication/Authorization error handling - If failsm send error message with error status code

3. Data transformation for Database: Transform the valdiated input data to a format which is comptabile with the database.

4. Call Model layer to perform CRUD operations

5. Data transformation for API response: Transform the database response to a format which is compatible with the API response.

6. Handle successful response: If API response is successful one, return with success code.

7. Handle failed response: If there were any errors while fetching API response or if the response itself is the failed one, send error response with proper message and response code.

### API Model layer
Model layer of an API does following:
1. Perform (multiple) database CRUD operations.
2. Process the data: Process the data from database so that we can compute the response which controller wants.

### Server API
Backend server API contains URLs via which clients can communicate with it. Few generic rules which we are following for server API are:
- Content type for server API's request and response is JSON.

Here are few APIs which server has:
#### Users API
1. Get all users - URL: `/users`, HTTP method: GET, HTTP response: array of users
2. Get a user - URL: `/users/:id`, HTTP method: GET, HTTP response: requested user 
3. Create a new user - URL: `/users`, HTTP method: POST, HTTP request: user to be created, HTTP response: created user
4. Replace the entire user - URL: `/users/:id`, HTTP method: PUT, HTTP request: user to be replaced, HTTP response: replaced user
5. Update the user - URL: `/users/:id`, HTTP method: PATCH, HTTP request: user to be updated, HTTP response: updated user
6. Delete the user - URL: `/users/:id`, HTTP method: DELETE, HTTP response: deletion status

#### Notes API
1. Get all notes - URL: `/notes`, HTTP method: GET, HTTP response: array of notes
2. Get a note - URL: `/notes/:id`, HTTP method: GET, HTTP response: requested note 
3. Create a new note - URL: `/notes`, HTTP method: POST, HTTP request: note to be created, HTTP response: created note
4. Replace the entire note - URL: `/notes/:id`, HTTP method: PUT, HTTP request: note to be replaced, HTTP response: replaced note
5. Update the note - URL: `/notes/:id`, HTTP method: PATCH, HTTP request: note to be updated, HTTP response: updated note
6. Delete the note - URL: `/notes/:id`, HTTP method: DELETE, HTTP response: deletion status

# Important Concepts
## How to change listening port in Express.js
To change the listening port of the server in Express.js, go to `bin -> www` and update 
```
var port = normalizePort(process.env.PORT || '9000');
```
## Node package manager (npm)
It is the package manager for Node.js, and it is used to manage and install third-party packages (libraries, modules, etc.) that your application depends on.

## .gitignore
There are lot of files which you don't want to part of git. Example: generated files, installed node modules etc. Such files can be added to .gitignore file and now these files will not be picked by git while commit, push etc.

## Curl commands
Below are samples of CURl commands for server API:

### User API
1. To get all users,
```
curl -X GET http://localhost:9000/users
```
2. To get a particular user
```
curl -X GET http://localhost:9000/users/1
```
3. To update partial information of the user
```
curl -X PATCH http://localhost:9000/users/3 -H 'Content-Type: application/json' -d '{"firstName": "Saloni"}'
```
4. To create a new user resource
```
curl -X POST http://localhost:9000/users -H 'Content-Type: application/json' -d '{"firstName": "Abhishek", "lastName": "Kumawat"}'
```
5. To update a user with new user data
```
curl -X PUT http://localhost:9000/users/3 -H 'Content-Type: application/json' -d '{"firstName": "Mehul", "lastName": "Kumawat"}'
```
6. To delete a user
```
curl -X DELETE http://localhost:9000/users/3
```