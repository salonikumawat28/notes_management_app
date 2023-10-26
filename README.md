# Notes Management App

Notes Management App is a one stop solution to create, update and view your notes at one place.

# App links
## FrontEnd: 
Prod URL: https://notes-management-app-client-fkd9cddkz-saloni-kumawats-projects.vercel.app

Dev URL: http://localhost:3000/

## BackEnd: 
Prod URL:
https://notes-management-app-server-d246095aa0a9.herokuapp.com/

Dev URL: http://localhost:9000/

## Existing credentials
You can create your own account by going to signup in FrontEnd or calling `signup` API in backend. Alternatively, you can use `test5@test.com` and `Test@1234` to login.

# Design and Architecture
## Backend
Backend is designed in ExpressJS. We have leveraged common web design principles including REST APIs, stateless server, modularized code etc. Here is how request flow looks like:
![mermaid-diagram-2023-10-23-122749](https://github.com/salonikumawat28/notes_management_app/assets/72411385/101ce447-0eff-42a8-b633-a12f00609a46)
### Backend server in nutshell
Here are how a client request goes through different parts of the backend server:
1. Client sends request to the server
2. Express.js app gets the request and passes it a chain of middlewares.
3. **CORS**: Cors middleware adds the cors headers to the response to enable cross origin resource sharing. This enables client to receive successful response from the server without facing any cors issues.
4. **JSON Parse**r: Json Parser middleware parses the request JSON body and replaces it with JS object so that it can be easily used by the express server.
5. Router decision: Based on the URL, first level of router is chosen. For example, for `/login`, `/signup`, `authRouter` is chosen; and for `/notes`, `/notes/1234`, `notesRouter is chosen`.
6. **Router**: First level of router decides the sub-routing of the URL and sends the request through a chain of middlewares specific to that URL. For example, `authRouter` sends `/login` request through chain of middleware specific to login like `validateLoginRequest` etc.
7. **Request pre-processor**: Each request goes through its own specific pre-processor which sanitizes the request body, URL params, query parameters etc. For example, it removes the unwanted variables from the request body; it trims the necessary values and so on.
8. **Request validator**: Each request goes through its own validator which validates the request data be it body, URL params or query parameters. If the validation fails, this step short circuits to `ErrorHandler` middleware which then sends the error response to the client.
9. **Authenticator**: If any API request is not public, it goes through `authenticator` middleware. This middlware checks if the request header has JWT token. If yes, it checks verifies its authnticity. If authentic, it decodes the authenticated user id from the JWT token and sets it to the `request.authenticatedUserId` so that it can be used by future middlewares. If authentication fails, this step short circuits to the `ErrorHandler` middlware.
10. **Controller**: Controller ensures that request went through all the necessary middlewares. If it did, controller sends the request to the service layer to get the data. Once it receives data, it creates response from it and sends the response back to the express.js app. In case of any errors, this step calls `ErrorHandler` middleware.
11. **Service Layer**: Service layer contains all the business logic. It is also responsible to call models to get the data from database.
12. **Models**: Mongoose models are called to communicate with our MongoDB database. These models does a few important things like creating collections, performing CRUD operations, indexing databases on text for faster search of sub-strings, auto-updating values like `_createdAt`, `_updatedAt` fields.
13. **Database**: We are using MongoDb database for notes and user management. We will discuss more about it in later sections.
## Database
We are using MongoDB database which is a NoSQL database to manage notes and users. 
### Why NoSQL?
We have chosen NoSQL over SQL for this project because of various reasons:
1. **No ACID**: We have no requriments of any ACID transactions in any requests as of now.
2. **Development Speed**: NoSQL databases are easy and fast to setup and thus it makes development quicker especially in initial phases.
3. **Scalability and Avalabiltiy**: NoSQL databases are easily scaled horizontally, can be distributed across clusters and thus can be highly available. The same can be done with SQL as well but not with that ease.
### Schema
This is the schema we currently have:
![mermaid-diagram-2023-10-23-172740](https://github.com/salonikumawat28/notes_management_app/assets/72411385/f790b27e-d993-4f60-a1bb-38027e7841e6)
1. We have 2 collections, `notes` and `users` (check above diagram for details).
2. Each `user` collection has `_id`, `name`, `email` and `password`.
3. Each `Note` collection has `_id`, `title`, `content`, `author`, `_createdAt`, `_updatedAt` fields.
4. `Author` of `Note` collection refers to a `User` document.
5. A user can have multiple notes but a note can have only one user.
6. `_id` and `author` both are indexed in `Note` collection so that we can search the note quickly even by `user id` which is `author`.
7. `_id` and `email` is indexed in `User` collection so that we can search the user quickly even by `email`.
8. `title` and `content` are _text indexed_ in `Note` collection which makes sub-string search fast in notes. We will discuss this in further sections
### Why this schema? Alternatives and Tradeoffs
There were 3 potential schema choices in front:

**Approach 1 - Embedding:**
In this approach, we keep all notes of the user along with user in a single collection. i.e. We can create a collection say `UserNotes` with fields like `_id`, `name`, `email`, `password`, `notes` where `notes` is array of notes of the user. This is simple approach and good for read-heavy workloads but this approach may lead to document growth and potential data duplication. Example: Once we add feature of sharing notes with other users, we have to duplicate same note in all the users collections.

**Approach 2 - References with Array of Note IDs:**
In this approach, we modify the approach 1 and keep the array of note ids in the `user` collection and the actual notes stay in a separate collection. i.e. Note is not aware of its author but User is aware of all of its notes. This appoach separates the data concerns, address note duplicity problem but this approach might require multiple queries for a result. For example, to search a text in all the notes of a user, we first need to get all the note ids of the user and then query those notes with the search text.

**Approach 3 - References with Author Field:**
In this approach, `user` collection is not aware of the note it owns. Instead we do opposite of approach 2 i.e. Each note document has the user id. This approach doesn't result in multiple queries for text search and other queries which we generally use. **Because of these reasons, we are using Approach 3.**

### Text indexing - What and Why?
Searching a small string within a large string is a time consuming task. We have a search feature where user can search for a text and we should show the notes which has that seached text and the results should be shown in sorted order of search rank. Best approach to save time consumed in search is to _text index_ the fields to be searched. 
As part of text indexing, MongoDB does following:
1. Tokenization: When we create a text index, MongoDB tokenizes the text in the specified fields. Tokenization involves breaking down the text into individual words or tokens.
2. Stemming: MongoDB also applies stemming during text indexing. Stemming reduces words to their root or base form, so variations of a word (e.g., "running" and "ran") are treated as the same.
3. Search Functionality: Once the text index is created, we can use the `$text` operator in queries to perform text searches. For example, we might use queries like { $text: { $search: 'keyword' } } to find documents containing a specific keyword in the indexed fields.

**Note**: This approach is more meaningful when the data to be searched against is quite large and the dataset is accessible by a large set of users. This makes the _text indexing_ more useful as it saves lot of computation time.
## FrontEnd
FrontEnd is designed in ReactJs. We leverage ReactJS features for state management in UI. Here is how the FrontEnd structure looks like:
![mermaid-diagram-2023-10-23-203732](https://github.com/salonikumawat28/notes_management_app/assets/72411385/16bdbf5c-7f17-40e2-82dd-9a087cad0b59)
### FrontEnd server in nutshell
Here is a brief explanation of the FrontEnd structure:
1. Rendering starts from `index.js` which calls `App` component
2. **App** component: App component provides the authentication context so that all child components can get or set authentication data. In addition, App component also calls `NotesManagementApp` to render the UI.
3. **AuthContext**: Consolidated place where authenticationd data is present. This data is also hooked to React state and thus re-renderers all the UI components users whenever auth data changes. This magic allows auto-rendering of authenticated page when user logs in and auto-rendering of public page when user logs out.
4. **Notes management app**: This is just a wrapper holding client side Router.
5. **Router**: This client side router routes to specific compoents based on URL and authentication state. Example: if URL is /signup but user is logged in, user will be routed to Authenticated home page component.
6. **Public Home Page**: Public home page is reponsible to show UI when user is not logged in. Based on URL, it can show login page or signup page.
7. **Authenticated Home Page**: Authenticated home page shows authenticated page when user is logged in. In addition, this component also provides the notes context so that all child components can get or set notes data.
8. **NotesContext**: Consolidated place where notes data is present. This data is also hooked to React state and thus re-renders all the UI components users whenever notes data changes. This magic allows auto-populating of new note in the notes list when added from `CreateNote` component.
9. **NotesManager**: NotesManager component is responsible to show `CreateNote` component to create new note, `NotesList` to show list of notes, `NotesDetail` to show a specific note which can then be edited.

# App Usage
We can communicate with the App by accessing FrontEnd via browser or Backend via CURL commands.
## BackEnd Server
Here are the API endpoints which are supported:
<table>
<tr>
<th>API</th>
<th>Curl command </th>
<th>Sample Success response </th>
<th>Sample failure response </th>
</tr>
<tr>
<td>
Signup:
</td>
<td>

```
curl -X POST ${BACKEND_URL}api/v1/auth/signup -H 'Content-Type: application/json' -d '{"name": "First Last", "email": "test4@test.com", "password": "Test@1234"}'
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
Login
</td>
<td>

```
curl -X POST ${BACKEND_URL}api/v1/auth/login -H 'Content-Type: application/json' -d '{"email": "test5@test.com", "password": "Test@1234"}'
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
Get a User
</td>
<td>

```
curl -X GET ${BACKEND_URL}api/v1/users/me -H "Authorization: Bearer $TOKEN"
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
Update partial information of user
</td>
<td>

```
curl -X PATCH ${BACKEND_URL}api/v1/users/me -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"bla": "updatedFirst Last"}'
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
Update password of user
</td>
<td>

```
curl -X PATCH ${BACKEND_URL}api/v1/users/me/password -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"password": "Test@1235"}'
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
Delete a user
</td>
<td>

```
curl -X DELETE ${BACKEND_URL}api/v1/users/me -H "Authorization: Bearer $TOKEN"
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
Create a new note
</td>
<td>

```
curl -X POST ${BACKEND_URL}api/v1/notes -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"title": "Test 2 Title 2", "content": "Test 2 content 2"}'
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
Update partial information of a note
</td>
<td>

```
curl -X PATCH ${BACKEND_URL}api/v1/notes/$NOTE_ID -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"title": "Updated Test 2 Title 1"}'
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
Get a particular note
</td>
<td>

```
curl -X GET ${BACKEND_URL}api/v1/notes/$NOTE_ID -H "Authorization: Bearer $TOKEN"
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
Get all notes
</td>
<td>

```
curl -X GET ${BACKEND_URL}api/v1/notes -H "Authorization: Bearer $TOKEN"
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
Search notes by text
</td>
<td>

```
curl -X GET "${BACKEND_URL}api/v1/notes?search=bla" -H "Authorization: Bearer $TOKEN"
```

</td>
<td>
    
```json
[
  {
    "_id": "6536bc3dcdcb67dd1666f244",
    "title": "Test 2 bla Title 1",
    "content": "Test 2 bla content 1",
    "_updatedAt": "2023-10-23T18:32:29.600Z",
    "_createdAt": "2023-10-23T18:32:29.600Z"
  },
  {
    "_id": "6536bc44cdcb67dd1666f246",
    "title": "Test 2 Title 1",
    "content": "Test 2 bla content 1",
    "_updatedAt": "2023-10-23T18:32:36.370Z",
    "_createdAt": "2023-10-23T18:32:36.370Z"
  },
  {
    "_id": "6536bc2ccdcb67dd1666f240",
    "title": "Test 2 bla Title 1",
    "content": "Test 2 content 1",
    "_updatedAt": "2023-10-23T18:32:12.990Z",
    "_createdAt": "2023-10-23T18:32:12.990Z"
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
Delete a note
</td>
<td>

```
curl -X DELETE ${BACKEND_URL}api/v1/notes/$NOTE_ID -H "Authorization: Bearer $TOKEN"
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
</table>

## FrontEnd Server
Here are the following ways user can communicate with the notes management app:
1. If user is not authenticated, user can go to signup page at ${FRONTEND_URL}signup, and to login page at ${FRONTEND_URL}login.
2. User can submit signup form to create account and submit login form to log into the account.
3. If user is authenticated, user will see the authenticated home page irrespective of the URL.
4. In authenticated page, user can see the UI to create a new note. If user clicks on it, the UI will expand and user can add title and content of the note. When user moves out of the create new note UI, the note is automatically saved.
5. In authenicated page, user can see the UI with all the notes of the user. When user click on any note, the note will open in extended mode as a popover. User can edit this opened note and it automatically gets saved when user clicks out of this UI.
6. User can log out of the application by clicking on the Logout button in the header UI.

# Development - Quick start
## Github repo clone
```
git clone https://github.com/salonikumawat28/notes_management_app.git
cd notes_management_app
```
## Start FrontEnd Server locally
```
npm install
npm start
```
Server can be accessed at `http://localhost:3000`
## Start BackEnd Server locally
```
npm install
npm start
```
Server can be accessed at `http://localhost:9000`

## Deploy FrontEnd
We are deploying FrontEnd using vercel:
First time deploy:
```
cd client
npm install -g vercel
vercel
<Follow instructions on commandline>
```
Following above commands, you should get response like:
```
🔗  Linked to saloni-kumawats-projects/notes-management-app-client (created .vercel and added it to .gitignore)
🔍  Inspect: https://vercel.com/saloni-kumawats-projects/notes-management-app-client/5rLkTNSXF4NesTcKrM2Xj6DJWoTp [1s]
✅  Preview: https://notes-management-app-client-bcgoqllgv-saloni-kumawats-projects.vercel.app [1s]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡  To change the domain or build command, go to https://vercel.com/saloni-kumawats-projects/notes-management-app-client/settings
```

If it fails on `npm install` command, then in browser login to vercel and go to your project -> settings and then in build settings, override the install command to `npm install --force`

To overrite the deployment, run:
```
vercel --prod
```
## Deploy backend
Heroku deployment relies on `heroku.yml` file and a root level `package.json` file so we have created one in the root level as a wrapper to the package.json in server folder.

First time deploy:
```
Create heroku account
Install heroku CLI

In commandline:
cd server
heroku login
heroku create notes-management-app-server
```

These step should give the github repo link on heroku 
```
Creating ⬢ notes-management-app-server... done
https://notes-management-app-server-d246095aa0a9.herokuapp.com/ | https://git.heroku.com/notes-management-app-server.git
```

Add this repo:
```
git remote add heroku https://git.heroku.com/notes-management-app-server.git
git push heroku main
```

As response, you should get the app link where it got deployed:
```
https://notes-management-app-server-d246095aa0a9.herokuapp.com/
```

To overrite the deployment, simply run:
```
git push heroku main
```


# User Authentication
## Backend
### Signup - Passoword hashing and Token Creation

<img src="https://github.com/salonikumawat28/notes_management_app/assets/72411385/aa918cc0-294d-4c76-aca5-fd481df18623" width="40%">

During signup, we go through parts of the backend server like pre-processor, validator, controller etc. One of those part is service layer. In service layer, we do following:
1. Check if the user with this email already exists. If yes, error out.
2. Hash the password using bcrypt.
3. Create the new user by calling mongoose models.
4. Using the userId of the created user, create the JWT token.

### Login - Password hash comparison and Token Creation

<img src="https://github.com/salonikumawat28/notes_management_app/assets/72411385/721e06e8-fc72-4d20-a031-46cacc7d3d9a" width="40%">

During login, we do following in service layer:
1. Get the user for the given email from databaseusing mongoose models.
2. Compare the login password with the database stored password hash using bcrypt.
3. If password matches, create the JWT token using userId.

### Authenticate API request - Token verification

<img src="https://github.com/salonikumawat28/notes_management_app/assets/72411385/3c2fe9ce-8005-4da8-ada8-7e1d34e1767a" width="40%">

When user hits a URL which requires authentication, then the authenticator middleware does following:
1. Checks if the `request.headers` has `authorization` value set or not.
2. If set, check if the `authorization` is a Bearer token.
3. Validate the passed `authorization` JWT token. If user passes a different token, it will never get decoded.
4. Decode the JWT token to get the user id.
5. Set the user id as `request.authenticatedUserId` so that it can be used by controller.

### Long lived access token vs Short lived - Trade offs
Long lived access tokens are token with longer expiry say 1-2 days or may be no expiry at all. Since there is no expiry, user can use the tokens even after logout (if copied somewhere before logout). This creates a security risk and makes it vulnerable.

A solution is to have short lived access tokens say 90 secs and an additional token called refresh token. When user sends an expired access token, server invalidates the request and client sends a new request with refresh token to get the new access token. This way, even if the access token is leaked, it will shortly expire.

We currently have long lived access token as its easier to implement for a POC.

## FrontEnd
1. When we login or signup, we get access token in return which we store both in `localstorage` and in `AuthContext`. 
4. For all authenticated requests, client intercepts the axios calls and add `authorization` header in the axios request.
3. When user logs out, we remove the access token from `localstorage` and `AuthContext`.
2. When we logout in other tab or window for the same origin, we listen to that change event of `localstorage` so that we can know in our tab that user is logged out or logged in.

# Unit and E2E testing
Our testing is very limited currently. FrontEnd doesn't have any unit or e2e tests. In backend, we have unit testing but no E2E testing. In unit testing also, we only have unit tests for contoller layer and service layer, but no unit tests for validator, authenticator, request pre-processor, router etc.

We are using `mocha`, `chai` and `sinon` for unit testing.

To run unit tests in backend:
```
cd server
npm run test
```

# Bottlenecks and Missing features
## JWT token not bound to browser session
Currently client can copy the access token and send an API request using CURL commands using the same access token. This is a securty risk as if anyone copies the token, they can access the APIs from anywhere. 

To fix this, we can take browser information from the request during signup and login and add that as part of JWT token and verify that the information matches with all new request's browser information.

## Access token has no expiry
Currently access token has no expiry. This poses security risk. We should use short lived access token + refresh token concept to solve this.

## No Logout functionality in server
Currently client has `Logout`` feature which when clicked, the access token is removed from the client so that user needs to login again. The problem is that the access token itself has no expiry as its long living token and server will authenticate the access token if anyone has it even though client has logged out.

There are few potential solutions for this:
1. We should add a logout functionality in server which adds the tokens in a revoke list so that if anyone tries to send a request with that revoked token, we invalidate. This revoke list should be maintained in database for persistance.
2. Instead of long lived access tokens, we should use concept of short lived access tokens along with refresh tokens. This makes sure that after a certain time period, then access token is expired.
3. Combination of above steps is a better idea as only step 1 will bloat up the revoke list and we will not be able to clean the list frequently. 

## Missing features - FrontEnd
1. **No search functionality in FrontEnd** - We have search functionality in Backend but currently we are not using it in FrontEnd.
2. **Code needs better structuring** - Currenly React component itself is making the axios calls. Ideallywe should have another layer which should do this.
3. **No caching** - Having caching helps in faster display of cached data. The cached data might be stale but is better than showing loading indicator in the meantime the latest data is fetched.
4. **No offline first experience** - Currently if user create a note in FrontEnd when user is offline, the create note will fail. Ideally we should optimistaclly show the created note in the notes list display with an icon to indicate its not yet uploaded. This gives better UX.
5. **No unit or e2e tests** - We should add unit tests and e2e tests in FrontEnd.

# Code structuring
```
Notes Mangement App
|-- client
|   |-- public
|   |-- src
|   |   |-- components
|   |   |-- contexts
|   |   |-- css
|   |   |-- pages
|   |   |-- utils
|   |-- package.json
|-- server
|   |-- configs
|   |-- controllers
|   |-- db
|   |-- errors
|   |-- middlewares
|   |-- models
|   |-- routes
|   |-- services
|   |-- tests
|   |-- utils
```

<!--
# Rough
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

# Important Concepts

## How to make API call from frontend

## How to change listening port in Express.js

To change the listening port of the server in Express.js, go to `bin -> www` and update

```
var port = normalizePort(process.env.PORT || '9000');
```

## Node package manager (npm)

It is the package manager for Node.js, and it is used to manage and install third-party packages (libraries, modules, etc.) that your application depends on.

## .gitignore

There are lot of files which you don't want to part of git. Example: generated files, installed node modules etc. Such files can be added to .gitignore file and now these files will not be picked by git while commit, push etc.

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

## React component - attributes and child elements

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
2. `app.use()` is used to setup a lot of things in the express app. One of the main example is to set our URL routers. Example: `app.use('/api/v1/users', usersRouter);`

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
mongodb+srv://Cluster93678:Cluster93678@cluster93678.0n6ht8f.mongodb.net/api/v1/notes_management?retryWrites=true&w=majority"
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

## Database terminology

1. Collection - Table is called Collection in MongoDB
2. Document - Row/Record is called Document in MongoDB

# TODO

1. Add database points like who will create db, who will connect to db, when table will be create and who/when CRUD opreations will happen.
2. Explain and write about the database disconnect logic on server stop
3. Add curl API for notes in readme
4. Add in readme that why we are doing window onevetnlistener on storage.
5. Add doc that we are using long lived access tokens and not short lived + refresh token concept.

-->


<!--  
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

RequestStart <--\> |1. Client request.<br/>17. Send response to client| ExpressApp
ExpressApp --\> |2. Request & response to fill in.| Cors
Cors --\> |3. req, res with cors headers.| JsonParser
JsonParser --\> |4. req with js object body, res| RouterCondition
RouterCondition --\> |5. calls router specific to URL.| Router
Router --\> |6. calls sub-router middlewares| RequestPreProcessor
RequestPreProcessor --\> |7. pre-processed req, res| RequestValidator
RequestValidator --\> |8. valdiated req, res| Authenticator
Authenticator --\> |9. authenticated req, res | Controller
Controller --\> |10. calls service layer| Service
Service <--\> |11. calls model layer for db communication| Model
Model <--\> |12. calls db for CRUD operations<br/>13. Database returns response.| Database
Model --\> |14. returns data| Service
Service --\> |15. returns data| Controller
Controller --\> |16. send response with data| ExpressApp 

flowchart TB
subgraph Controller
    Co(Auth Controller)
end
subgraph Auth-service
    direction TB
    E(Get user of email)
    H(Compare Hash password <br/>&#x28 bycrpt.compare &#x29)
    J(Create JWT access token)
end
subgraph Mongoose-Model
    Mo(Model layer)
end

Controller <--\> Auth-service
Auth-service <--\> Mongoose-Model
E --\> H
H --\> J


flowchart TB
subgraph Request-Validator
    Re(Request Validator)
end
subgraph Authenticator
    direction TB
    CheckReqHeader(Check if the <i>req.headers.authorization</i> present)
    CheckToken(Check if token is <i>Bearer</i> token)
    JWT(Validate JWT token)
    Decode(Decode JWT token to get userId)
    SetUserId(Sets userId to <i>req.authenticated.UserId</i>)
end
subgraph Controller
    Co(Use authenticatedUserId as userId)
end

Re --\> Authenticator
Authenticator --\> Controller
CheckReqHeader --\> CheckToken
CheckToken --\> JWT
JWT --\> Decode
Decode --\> SetUserId


flowchart TB
subgraph Controller
    Co(Auth Controller)
end
subgraph Auth-service
    direction TB
    E(Get user of email)
    H(Compare Hash password <br/>&#x28 bycrpt.compare &#x29)
    J(Create JWT access token)
end
subgraph Mongoose-Model
    Mo(Model layer)
end

Controller <--\> Auth-service
Auth-service <--\> Mongoose-Model
E --\> H
H --\> J


flowchart TB
Index[index.js]
App[App Component]
Context[<b>Auth Context</b> <br/> Contains getter and setter for authenticate user ]
NotesManagement[Notes Management App Component]
Router[ Browser Router]
Decision{url & isLoggedIn </br> will decide <br/> the route}
PublicL[Public Homepage <br/> + <br/> Login]
PublicS[Public Homepage <br/> + <br/> Signup]
Auth[Auth Homepage]
Login[Login]
Signup[Signup]
AuthHeader[Auth Header]
Logout[Logout]
NoteManager[Notes Manager]
NContect[<b>Note Context</b><br/> Contains getter and setter for authenticate note ]
NList[Note List]
NCreate[Create Note]
NUpdate[Editable popover to update note]

Index --\> App
App --\> NotesManagement
App --\> Context
NotesManagement --\> Router
Router --\> Decision
Decision --\> PublicL --\> Login
Decision --\> PublicS --\> Signup
Decision --\> Auth 
Auth ---\> NoteManager
Auth ---\> AuthHeader
AuthHeader --\> Logout
NoteManager --\> NContect
NoteManager --\> NList
NoteManager --\> NCreate
NoteManager --\> NUpdate

style Context fill:#ffffcc
style NContect fill:#ffffcc
  
```mermaid
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
-->
