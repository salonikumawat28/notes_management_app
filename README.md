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

5. Light-weight Data transformation for API response: Transform the database response to a format which is compatible with the API response.

6. Handle successful response: If API response is successful one, return with success code.

7. Handle failed response: If there were any errors while fetching API response or if the response itself is the failed one, send error response with proper message and response code.

### API Model layer

Model layer of an API does following:

1. Perform (multiple) database CRUD operations.
2. Process the data: Process the data from database so that we can compute the response which controller wants.

# Server API

Backend server API contains URLs via which clients can communicate with it. Few generic rules which we are following for server API are:

- Content type for server API's request and response is JSON.

Here are few APIs which server has:

## Users API

1. Get all users - URL: `/api/users`, HTTP method: GET, HTTP response: array of users
2. Get a user - URL: `/api/users/:id`, HTTP method: GET, HTTP response: requested user
3. Create a new user - URL: `/api/users`, HTTP method: POST, HTTP request: user to be created, HTTP response: created user
4. Replace the entire user - URL: `/api/users/:id`, HTTP method: PUT, HTTP request: user to be replaced, HTTP response: replaced user
5. Update the user - URL: `/api/users/:id`, HTTP method: PATCH, HTTP request: user to be updated, HTTP response: updated user
6. Delete the user - URL: `/api/users/:id`, HTTP method: DELETE, HTTP response: deletion status

## Notes API

1. Get all notes - URL: `/api/notes`, HTTP method: GET, HTTP response: array of notes
2. Get a note - URL: `/api/notes/:id`, HTTP method: GET, HTTP response: requested note
3. Create a new note - URL: `/api/notes`, HTTP method: POST, HTTP request: note to be created, HTTP response: created note
4. Replace the entire note - URL: `/api/notes/:id`, HTTP method: PUT, HTTP request: note to be replaced, HTTP response: replaced note
5. Update the note - URL: `/api/notes/:id`, HTTP method: PATCH, HTTP request: note to be updated, HTTP response: updated note
6. Delete the note - URL: `/api/notes/:id`, HTTP method: DELETE, HTTP response: deletion status

# Important Concepts

## How to make API fetch call from frontend

1. GET All:

```
const response = await fetch("http://localhost:9000/api/notes/");
const data = await response.json();
```

2. GET:

```

```

2. POST:

```
const requestInfo = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify(note)
};
const response = await fetch("http://localhost:9000/api/notes/", requestInfo);
const createdNote = await response.json();
```

3. PATCH:

```

```

4. PUT:

```

```

5. DELETE:

```

```

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

## Auth API

1. To signup:

```
curl -X POST http://localhost:9000/api/auth/signup -H 'Content-Type: application/json' -d '{"name": "First Last", "email": "test5@test.com", "password": "Test@1234"}'
```

Success response:

```
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM2ODYyZGVmMmVhY2VmM2FjOWExYjIiLCJpYXQiOjE2OTgwNzIxMDl9.FstnAA-lm2LYWnHcPfHyfEamFuVKXLPq6T7kc7dtIoY"
}
```

Failed response:

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [
      {
        "field": "name",
        "message": "Name must contain only letters and spaces"
      },
      {
        "field": "password",
        "message": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      }
    ],
    "globalErrors": []
  }
}
```

2. To login:

```
curl -X POST http://localhost:9000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "test4@test.com", "password": "Test@1234"}'
```

Success response:

```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM2ODYyZGVmMmVhY2VmM2FjOWExYjIiLCJpYXQiOjE2OTgwNzIxMDl9.FstnAA-lm2LYWnHcPfHyfEamFuVKXLPq6T7kc7dtIoY"
}
```

Failed response:
Example 1:

```json
{
  "error": {
    "name": "UnauthorizedError",
    "message": "Invalid credentials."
  }
}
```

Example 2:

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [
      {
        "field": "email",
        "message": "Email must be a valid email address"
      }
    ],
    "globalErrors": []
  }
}
```

### User API

1. Set auth token in command line:

```
export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM2YmJmM2NkY2I2N2RkMTY2NmYyM2MiLCJpYXQiOjE2OTgwODU4NzV9.69b0UearOm4trk_Yet2xSK2zV_5WAN99DpOIipNBESg
```

2. To get a particular user

```
curl -X GET http://localhost:9000/api/users/me -H "Authorization: Bearer $TOKEN"
```

Success response:

```json
{
  "_id": "6536862def2eacef3ac9a1b2",
  "name": "First Last",
  "email": "test4@test.com"
}
```

Failed respinse:

```json
{
  "error": {
    "name": "NotFoundError",
    "message": "User not found."
  }
}
```

3. To update partial information of the user

```
curl -X PATCH http://localhost:9000/api/users/me -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"bla": "updatedFirst Last"}'
```

Success response:

```json
{
  "_id": "6536862def2eacef3ac9a1b2",
  "name": "updatedFirst Last",
  "email": "test4@test.com"
}
```

Failed response:

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [
      {
        "field": "name",
        "message": "Name must contain only letters and spaces"
      }
    ],
    "globalErrors": []
  }
}
```

5. To update password of the user

```
curl -X PATCH http://localhost:9000/api/users/me/password -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"password": "Test@1235"}'
```

Success response:

```json
{
  "message": "Password updated successfully"
}
```

Failed response:

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [
      {
        "field": "password",
        "message": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      }
    ],
    "globalErrors": []
  }
}
```

6. To delete a user

```
curl -X DELETE http://localhost:9000/api/users/me -H "Authorization: Bearer $TOKEN"
```

Success response:

```json
{
  "message": "User and associated notes deleted successfully"
}
```

Failed response:

```json
{
  "error": {
    "name": "UnauthorizedError",
    "message": "No token provided"
  }
}
```

## Notes API

```
1. To create a new note resource
```

curl -X POST http://localhost:9000/api/notes -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"title": "Test 2 Title 1", "content": "Test 2 content 1"}'

export NOTE_ID=6536913d50415d6fc5e6b488

````
Success response:
```json
{
  "_id": "6536913d50415d6fc5e6b488",
  "title": "Test 2 Title 1",
  "content": "Test 2 content 1",
  "_createdAt": "2023-10-23T15:29:01.318Z",
  "_updatedAt": "2023-10-23T15:29:01.318Z"
}
````

Failed response:

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [],
    "globalErrors": ["\"value\" must contain at least one of [title, content]"]
  }
}
```

2. To update partial information of the note

```
curl -X PATCH http://localhost:9000/api/notes/$NOTE_ID -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"title": "Updated Test 2 Title 1"}'
```

Success response:

```json
{
  "_id": "6536913d50415d6fc5e6b488",
  "title": "Updated Test 2 Title 1",
  "content": "Test 2 content 1",
  "_updatedAt": "2023-10-23T15:33:13.513Z",
  "_createdAt": "2023-10-23T15:29:01.318Z"
}
```

Failed response:

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [],
    "globalErrors": ["\"value\" must contain at least one of [title, content]"]
  }
}
```

3. To get a particular note

```
curl -X GET http://localhost:9000/api/notes/$NOTE_ID -H "Authorization: Bearer $TOKEN"
```

Success response:

```json
{
  "_id": "6536913d50415d6fc5e6b488",
  "title": "Updated Test 2 Title 1",
  "content": "Test 2 content 1",
  "_updatedAt": "2023-10-23T15:33:13.513Z",
  "_createdAt": "2023-10-23T15:29:01.318Z"
}
```

Failed response:

```json
{
  "error": {
    "name": "NotFoundError",
    "message": "Note not found."
  }
}
```

4. To get all notes:

```
curl -X GET http://localhost:9000/api/notes -H "Authorization: Bearer $TOKEN"
```

Success response:

```json
[
  {
    "_id": "6536913d50415d6fc5e6b488",
    "title": "Updated Test 2 Title 1",
    "content": "Test 2 content 1",
    "_updatedAt": "2023-10-23T15:33:13.513Z",
    "_createdAt": "2023-10-23T15:29:01.318Z"
  },
  {
    "_id": "6536918950415d6fc5e6b48a",
    "title": "Test 2 Title 2",
    "_updatedAt": "2023-10-23T15:30:17.412Z",
    "_createdAt": "2023-10-23T15:30:17.412Z"
  },
  {
    "_id": "653691f850415d6fc5e6b48c",
    "title": "Test 2 Title 2",
    "content": "Test 2 content 2",
    "_updatedAt": "2023-10-23T15:32:08.517Z",
    "_createdAt": "2023-10-23T15:32:08.517Z"
  }
]
```

Failed response:

```
{
  "error": {
    "name": "UnauthorizedError",
    "message": "No token provided"
  }
}
```

4. To search notes containing given search query:

```
curl -X GET "http://localhost:9000/api/notes?search=bla" -H "Authorization: Bearer $TOKEN"
```

Success response:

```json
[
  {
    "_id": "6536bc3dcdcb67dd1666f244",
    "title": "Test 2 bla Title 1",
    "content": "Test 2 bla content 1",
    "_updatedAt": "2023-10-23T18:32:29.600Z",
    "_createdAt": "2023-10-23T18:32:29.600Z",
    "score": 1.2
  },
  {
    "_id": "6536bc44cdcb67dd1666f246",
    "title": "Test 2 Title 1",
    "content": "Test 2 bla content 1",
    "_updatedAt": "2023-10-23T18:32:36.370Z",
    "_createdAt": "2023-10-23T18:32:36.370Z",
    "score": 0.6
  },
  {
    "_id": "6536bc2ccdcb67dd1666f240",
    "title": "Test 2 bla Title 1",
    "content": "Test 2 content 1",
    "_updatedAt": "2023-10-23T18:32:12.990Z",
    "_createdAt": "2023-10-23T18:32:12.990Z",
    "score": 0.6
  }
]
```

Failed response:

```
{
  "error": {
    "name": "UnauthorizedError",
    "message": "No token provided"
  }
}
```

5. To delete a note

```
curl -X DELETE http://localhost:9000/api/notes/$NOTE_ID -H "Authorization: Bearer $TOKEN"
```

Success response:

```json
{
  "message": "Note deleted successfully"
}
```

Failed response:

```json
{
  "error": {
    "name": "CastError",
    "message": "Cast to ObjectId failed for value \"1126$\" (type string) at path \"_id\" for model \"Notes\""
  }
}
```

## Underscore Library

Underscore.js provides a collection of utility functions for common programming tasks in JavaScript. Some key functions and features offered by Underscore.js:

1. each(): Iterate over each element in an array or each property in an object.
2. isEmpty(): which checks whether a given object is empty.
3. map(): Create a new array by applying a function to each element in an existing array.
4. reduce(): Reduce an array to a single value.
5. filter: Create a new array with all elements that pass a test.

# Data persistence in Frontend

## When and how to use

There are scenarios when we need to persist data in the local storage of user. Example: when user is logged in, we want to persist this information so that if user refreshes the tab or reopens the tab, then user is stll loggedin.

We can use `localStorage` for this. It has `getItem` and `setItem` to persist the values.

## Storage event listener

If another tab logs out and updates the localstorage with this new value, then we want to react to that logout in our tab. Currently we get the localstorage in AuthProvider only once when the App is mounted. To listen to changes in storage for the login state, we should add a listener.

For this, we have added event listener in useEffect of NotesManagementApp which will be called when App is mounted, and in addition, we have also added callback to remove that listener which will be called when App is unmounted. In this listener, we are reacting to any change in our login state.

# React concepts

## React component - sttributes and child elements

A custom React component can have attributes and child elements as well. Example:

```
<Sample content="Hello" size=2>
  <p>This is child text.</p>
</Sample>
```

In above example, `content` and `size` are attributes of Sample component and `<p>This is child text.</p>` is children element.

We can access these attributes in `Sample` component as `props.content` and `props.size`. We can access the child element as `props.children`. `children` is reserved propertu to get the child element in React.

## React Context

When we want to share `state` across components, then one of the way is to **pass it down using props**. i.e. we keep on passing that `state` down to child components as `props`. Example if `App` component defines `isLoggedIn` state and it should be set by `Login` component by calling `setIsLoggedIn`, then we need to pass `setIsLoggedIn` method from `App` to `LoginPage` to `Login` component.

This approach is not scalable as a single variable might need to be passed across lot of components making:

1. Code cluttered and complex.
2. Additionally, the middle components dont need it but they need to take it as prop and then pass it to their child.
3. Code understanding and readability is impacted.

Solution for this is using `React context`. Instead if defining a `useState` variable, we can use React context by following these steps:

1. Create context
2. Define the Provider component of the created context. In this Provider component, define the `useState` variables and set it in the context Provider.
3. Define `useContext` using the created context. Let's say you gave it name `useSampleContext`
4. Register the context Provider at the root component of the App. When you define a component at the root level, it can be used by all the components within the App. You can optionally register a provider for a sub-component but remember that only that sub-component and its child can access the context and not other components of the App. So generally we register the provider in the root component of the app.
5. Now you can use the created context in any component to get/change the state variables. For this, instead of `useState`, simply call `useSampleContext`

# Express Concepts

## Creating express app

1. Create the using `const app = express()` line.
2. `app.use()` is used to setup a lot of things in the express app. One of the main example is to set our URL routers. Example: `app.use('/api/users', usersRouter);`

## Starting the express app

Server is started using `listen` method.

```
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('listening', () => console.log('Listening on ' + port));
```

In above case, `app` is the app which we created using `express()`.

# Database concepts

## Creating database

We are creating the mongo database on cloud.
Now we can copy the database URL by first copying the cluster URL from mongo cloud cluster connection tab:

```
mongodb+srv://<cluster_name>:<cluster_password>@<cluster_url>?retryWrites=true&w=majority"
```

and then adding the database name in it:

```
mongodb+srv://<cluster_name>:<cluster_password>@<cluster_url>/<database_name>?retryWrites=true&w=majority"
```

Example:

```
Cluster URL example:
mongodb+srv://Cluster93678:Cluster93678@cluster93678.0n6ht8f.mongodb.net?retryWrites=true&w=majority"

Database URL example:
mongodb+srv://Cluster93678:Cluster93678@cluster93678.0n6ht8f.mongodb.net/api/notes_management?retryWrites=true&w=majority"
```

In above example:

## Connecting to the database

Express server will connect to the database on starting the server itself.
This is a 2 step process:

1. Connect to the db: We can connect to the db using `db.connectDb();`. Here we are not waiting for the connection to complete.
2. Start express server on successful connection: We can set `connected` listener on the database connection object to listen to whenever the connection is successful. As soon as connection is successfuly, we will start the express server.

```
db.getDbConnection().on('connected', () => {
  console.log('Mongoose connected to the database.');
  // Start the server
});
```

## Start performing CRUD operations

### CRUD operations

Model layer will be responsible to define methods to perform CRUD operations. In our model layer, we are using mongoose model for basic CRUD operations. Mongoose model will also create the collection automatically if its not already presented in the database.

### Auto increment

To auto-increment a field in the collection, we are using `mongoose-sequence` library.

### Example

```
const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

// Note: Setting _id to false so that mongoose doesn't auto create the _id.
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
  }, {_id: false});

  // Note: Setting mongoose-sequence to auto increment the _id.
userSchema.plugin(AutoIncrement, {inc_field: '_id'});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
```

## Database scalability

## Database indexing

## Database terminology

1. Collection - Table is called Collection in MongoDB
2. Document - Row/Record is called Document in MongoDB

# TODO

1. Add database points like who will create db, who will connect to db, when table will be create and who/when CRUD opreations will happen.
2. Explain and write about the database disconnect logic on server stop
3. Add curl API for notes in readme
4. Add in readme that why we are doing window onevetnlistener on storage.
5. Add doc that we are using long lived access tokens and not short lived + refresh token concept.

# Server Flow Diagram

Mermaid edit [link](https://www.mermaidchart.com/app/projects/1c640cf4-1f17-42bd-b19c-eec224895dbc/diagrams/6691bdfd-0093-4330-8e49-4f23eb4cefe9/version/v0.1/edit)
![mermaid-diagram-2023-10-23-122749](https://github.com/salonikumawat28/notes_management_app/assets/72411385/101ce447-0eff-42a8-b633-a12f00609a46)

# Server side - Creating access token

Mermaid [link](https://www.mermaidchart.com/app/projects/1c640cf4-1f17-42bd-b19c-eec224895dbc/diagrams/e8c5026b-b1eb-4f8e-b635-4b4eca8eddca/version/v0.1/edit)
![mermaid-diagram-2023-10-23-151125](https://github.com/salonikumawat28/notes_management_app/assets/72411385/721e06e8-fc72-4d20-a031-46cacc7d3d9a)

# Server side - Authenticate user flow

Mermaid [link](https://www.mermaidchart.com/app/projects/1c640cf4-1f17-42bd-b19c-eec224895dbc/diagrams/cba58154-52a0-4ed0-bedf-fcddb33d8311/version/v0.1/edit)
![mermaid-diagram-2023-10-23-150404](https://github.com/salonikumawat28/notes_management_app/assets/72411385/3c2fe9ce-8005-4da8-ada8-7e1d34e1767a)

# Server Side - login flow

Mermaid [link](https://www.mermaidchart.com/app/projects/1c640cf4-1f17-42bd-b19c-eec224895dbc/diagrams/e8c5026b-b1eb-4f8e-b635-4b4eca8eddca/version/v0.1/edit)
![mermaid-diagram-2023-10-23-150733](https://github.com/salonikumawat28/notes_management_app/assets/72411385/cc08d1f3-4221-4642-8050-8f81a6127525)

# Mongo Db Database Schema

Mermaid [link](https://www.mermaidchart.com/app/projects/1c640cf4-1f17-42bd-b19c-eec224895dbc/diagrams/7f25180f-67e8-402c-97b3-3d2239b972bf/version/v0.1/edit)
![mermaid-diagram-2023-10-23-172740](https://github.com/salonikumawat28/notes_management_app/assets/72411385/f790b27e-d993-4f60-a1bb-38027e7841e6)

<table>
<tr>
<td><b/>API</td><td><b/>Curl command </td> <td> <b/>Sample Success response </td> <td> <b/>Sample failure response </td>
</tr>
<tr>
<td>
1. Signup:
</td>
<td>

```
curl -X POST http://localhost:9000/api/auth/signup -H 'Content-Type: application/json' -d '{"name": "First Last", "email": "test4@test.com", "password": "Test@1234"}'
```

</td>
<td>
    
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM2ODYyZGVmMmVhY2VmM2FjOWExYjIiLCJpYXQiOjE2OTgwNzIxMDl9.FstnAA-lm2LYWnHcPfHyfEamFuVKXLPq6T7kc7dtIoY"
}
```

</td>
<td>

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [
      {
        "field": "name",
        "message": "Name must contain only letters and spaces"
      },
      {
        "field": "password",
        "message": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      }
    ],
    "globalErrors": []
  }
}
```

</td>
</tr>

<tr>
<td>
2. Login
</td>
<td>

```
curl -X POST http://localhost:9000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "test4@test.com", "password": "Test@1234"}'
```

</td>
<td>
    
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM2ODYyZGVmMmVhY2VmM2FjOWExYjIiLCJpYXQiOjE2OTgwNzIxMDl9.FstnAA-lm2LYWnHcPfHyfEamFuVKXLPq6T7kc7dtIoY"
}
```

</td>
<td>

Example 1:

```json
{
  "error": {
    "name": "UnauthorizedError",
    "message": "Invalid credentials."
  }
}
```

Example 2:

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [
      {
        "field": "email",
        "message": "Email must be a valid email address"
      }
    ],
    "globalErrors": []
  }
}
```

</td>
</tr>

<tr>
<td>
3. Get a User
</td>
<td>

```
curl -X GET http://localhost:9000/api/users/me -H "Authorization: Bearer $TOKEN"
```

</td>
<td>
    
```json
{
  "_id": "6536862def2eacef3ac9a1b2",
  "name": "First Last",
  "email": "test4@test.com"
} 
```

</td>
<td>

```json
{
  "error": {
    "name": "NotFoundError",
    "message": "User not found."
  }
}
```

</td>
</tr>

<tr>
<td>
4. Update partial information of user
</td>
<td>

```
curl -X PATCH http://localhost:9000/api/users/me -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"bla": "updatedFirst Last"}'
```

</td>
<td>
    
```json
{
  "_id": "6536862def2eacef3ac9a1b2",
  "name": "updatedFirst Last",
  "email": "test4@test.com"
}
```

</td>
<td>

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [
      {
        "field": "name",
        "message": "Name must contain only letters and spaces"
      }
    ],
    "globalErrors": []
  }
}
```

</td>
</tr>

<tr>
<td>
5. Update password of user
</td>
<td>

```
curl -X PATCH http://localhost:9000/api/users/me/password -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"password": "Test@1235"}'
```

</td>
<td>
    
```json
{
  "message": "Password updated successfully"
}
```

</td>
<td>

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [
      {
        "field": "password",
        "message": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      }
    ],
    "globalErrors": []
  }
}
```

</td>
</tr>

<tr>
<td>
6. Delete a user
</td>
<td>

```
curl -X DELETE http://localhost:9000/api/users/me -H "Authorization: Bearer $TOKEN"
```

</td>
<td>
    
```json
{
  "message": "User and associated notes deleted successfully"
}
```

</td>
<td>

```json
{
  "error": {
    "name": "UnauthorizedError",
    "message": "No token provided"
  }
}
```

</td>
</tr>

<tr>
<td>
7. Create a new note
</td>
<td>

```
curl -X POST http://localhost:9000/api/notes -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"title": "Test 2 Title 2", "content": "Test 2 content 2"}'
```

</td>
<td>
    
```json
{
  "_id": "6536913d50415d6fc5e6b488",
  "title": "Test 2 Title 1",
  "content": "Test 2 content 1",
  "_createdAt": "2023-10-23T15:29:01.318Z",
  "_updatedAt": "2023-10-23T15:29:01.318Z"
}
```

</td>
<td>

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [],
    "globalErrors": ["\"value\" must contain at least one of [title, content]"]
  }
}
```

</td>
</tr>

<tr>
<td>
8. Update partial information of a note
</td>
<td>

```
curl -X PATCH http://localhost:9000/api/notes/$NOTE_ID -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"title": "Updated Test 2 Title 1"}'
```

</td>
<td>
    
```json
{
  "_id": "6536913d50415d6fc5e6b488",
  "title": "Updated Test 2 Title 1",
  "content": "Test 2 content 1",
  "_updatedAt": "2023-10-23T15:33:13.513Z",
  "_createdAt": "2023-10-23T15:29:01.318Z"
}
```

</td>
<td>

```json
{
  "error": {
    "name": "ValidationError",
    "message": "Validation failed",
    "fieldErrors": [],
    "globalErrors": ["\"value\" must contain at least one of [title, content]"]
  }
}
```

</td>
</tr>

<tr>
<td>
9. Get a particular note
</td>
<td>

```
curl -X GET http://localhost:9000/api/notes/$NOTE_ID -H "Authorization: Bearer $TOKEN"
```

</td>
<td>
    
```json
{
  "_id": "6536913d50415d6fc5e6b488",
  "title": "Updated Test 2 Title 1",
  "content": "Test 2 content 1",
  "_updatedAt": "2023-10-23T15:33:13.513Z",
  "_createdAt": "2023-10-23T15:29:01.318Z"
}
```

</td>
<td>

```json
{
  "error": {
    "name": "NotFoundError",
    "message": "Note not found."
  }
}
```

</td>
</tr>

<tr>
<td>
10. Get all note
</td>
<td>

```
curl -X GET http://localhost:9000/api/notes -H "Authorization: Bearer $TOKEN"
```

</td>
<td>
    
```json
[
  {
    "_id": "6536913d50415d6fc5e6b488",
    "title": "Updated Test 2 Title 1",
    "content": "Test 2 content 1",
    "_updatedAt": "2023-10-23T15:33:13.513Z",
    "_createdAt": "2023-10-23T15:29:01.318Z"
  },
  {
    "_id": "6536918950415d6fc5e6b48a",
    "title": "Test 2 Title 2",
    "_updatedAt": "2023-10-23T15:30:17.412Z",
    "_createdAt": "2023-10-23T15:30:17.412Z"
  },
  {
    "_id": "653691f850415d6fc5e6b48c",
    "title": "Test 2 Title 2",
    "content": "Test 2 content 2",
    "_updatedAt": "2023-10-23T15:32:08.517Z",
    "_createdAt": "2023-10-23T15:32:08.517Z"
  }
]
```

</td>
<td>

```json
{
  "error": {
    "name": "UnauthorizedError",
    "message": "No token provided"
  }
}
```

</td>
</tr>

<tr>
<td>
11. Delete a note
</td>
<td>

```
curl -X DELETE http://localhost:9000/api/notes/$NOTE_ID -H "Authorization: Bearer $TOKEN"
```

</td>
<td>
    
```json
{
  "message": "Note deleted successfully"
}
```

</td>
<td>

```json
{
  "error": {
    "name": "CastError",
    "message": "Cast to ObjectId failed for value \"1126$\" (type string) at path \"_id\" for model \"Notes\""
  }
}
```

</td>
</tr>

```
flowchart TB
subgraph Client
    RequestStart[Request From frontend]
end
subgraph Server
    direction TB
    ExpressApp[<b>Express.js App</b>]
    Cors[<b>Cors</b> <br> Add cors to response]
    JsonParser[<b>Json Parser</b> <br> Convert json to js object in request body]
    RouterCondition{Decide Router <br/>based on URL}
    Router[<b>Router</b><br/>Decides sub-routing of the URL.]
    RequestPreProcessor[<b>Request pre processor</b><br/>Pre process the request]
    RequestValidator[<b>Request validator</b><br/>Validates the request<br/>Short circuits to error middleware if validation fails.]
    Authenticator[<b>Authenticator</b><br/>Check if user is authenticated<br/>Short circuits to error middleware if authentication fails.]
    Controller[<b>Controller layer</b><br/>Controller to handle request, call service and create response.<br/>Goes to error middlware in case of any errors.]
    Service[<b>Service layer</b><br/> Service to handle business logic]
    Model[<b>Model layer</b><br/>Mongoose models for database communication]
end
subgraph Database
    Db[<b>Database</b><br/> MongoDB]
end

RequestStart <--> |1. Client request.<br/>17. Send resposne to client| ExpressApp
ExpressApp --> |2. Request & response to fill in.| Cors
Cors --> |3. req, res with cors headers.| JsonParser
JsonParser --> |4. req with js object body, res| RouterCondition
RouterCondition --> |5. calls router specific to URL.| Router
Router --> |6. calls sub-router middlewares| RequestPreProcessor
RequestPreProcessor --> |7. pre-processed req, res| RequestValidator
RequestValidator --> |8. valdiated req, res| Authenticator
Authenticator --> |9. authenticated req, res | Controller
Controller --> |10. calls service layer| Service
Service <--> |11. calls model layer for db communication| Model
Model <--> |12. calls db for CRUD operations<br/>13. Database returns response.| Database
Model --> |14. returns data| Service
Service --> |15. returns data| Controller
Controller --> |16. send response with data| ExpressApp
```

```
flowchart LR
    subgraph client
    Request
    end
    client --> Router
    subgraph server
    Router --> Controller
    Controller --> Model
    Model --> Mongoose
    end
    subgraph DataBase
    DB
    end
    Mongoose --> DataBase
```

```
graph TB
    subgraph User
    U(/login)
    end
    User --> Web-API
    subgraph Chrome
        direction TB
        subgraph Web-API
        Re(Request)
        Res(Response)
        end
        Res --> Pr(Parse Response)
        Pr --> L{Logged In}
        L -->|Yes| AH(AuthHome Page)
        L -->|No| PH(PublicHome page)
        AH --> NC(NotesContex Provider)
        NC --> NL(NoteList
                Component) --> G(Get call)
    end
    subgraph Frontend-Server
        Has{Does
            client
            has
            latest
            version
            cached?}
        HCJ(HTML
            CSS
            Javascript)
    end
    subgraph Backend-server
        R(Router) --> Co(Controller)
        Co --> R
        Co --> M(Model)
        M --> Co
        M --> Mo(Mongoose)
        Mo --> M
    end
    subgraph DataBase
        DB
    end
    Re-->Has
    Has --Nothing To update------> Res
    Has --> HCJ --Updated data--> Res
    Mo --> DataBase
    DataBase --> Mo
    G --> R
    R --> G
```

```
flowchart LR
    subgraph User
    CL(Click Login Button)
    end
    subgraph Chrome
    S(Submit)
    AC(AuthContext page)
    AH(AuthHome Page)
    NL(NoteList)
    NV(NoteView)

    end
    subgraph Backened-Server
    R(Router)
    Co(Controller)
    M(Model)
    Mo(Mongoose)
    R --> Co
    Co --> M
    M --> Mo
    Mo --> M
    M --> Co
    Co --> R
    end
    subgraph Database
    Db
    end
    NL -- Get call --> R
    R --List of Notes --> NL
    CL --> S
    Mo --> Database
    Database --> Mo
    S -- Post call --> R
    R -- Logged In User --> AC
    AC -- setUser state --> AH
    AH --> NL
    NL --> NV

```

```
sequenceDiagram
    actor Client
    box rgba(255, 0, 0, 0.1) Frontend
        participant Chrome
    end
    box yellow Backend-Server
        participant R as Router
        participant Co as controller
        participant M as Model
        participant Mo as Moongose
    end
    box rgba(255, 0, 0, 0.1) Database
        participant Database
    end
    Client ->> Chrome:/login
    Chrome ->> R: Login Request(Emaill, password)
    R ->> Co: AuthController with request(email, password)
    Note over Co: Validate Input request
    Co ->> M: call Login method with param(email, password)

    M ->> Mo: 1. Validate Email Exist
    Mo ->> Database: get user(email)
    Database ->> Mo: If email exist return user else return error
    Mo ->> M: If email exist return user else return error

    M ->> Mo: 2. Compare Password
    Mo ->> Database: get password of this email
    Database ->> Mo: password from db
    Note over Mo: compare password from user with password from db
    Mo ->> M: If password does not matches return error

    Note over M: Create access token
    M ->> Co: access token
    Co ->> R: access token
    R ->> Chrome: access token
```

# Rough

## Text indexing

How Text Index Works:
Tokenization:

When you create a text index, MongoDB tokenizes the text in the specified fields. Tokenization involves breaking down the text into individual words or tokens.
Stemming:

MongoDB also applies stemming during text indexing. Stemming reduces words to their root or base form, so variations of a word (e.g., "running" and "ran") are treated as the same.
Search Functionality:

Once the text index is created, you can use the $text operator in queries to perform text searches. For example, you might use queries like { $text: { $search: 'keyword' } } to find documents containing a specific keyword in the indexed fields.

