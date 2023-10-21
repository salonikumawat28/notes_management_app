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
1. Get all users - URL: `/users`, HTTP method: GET, HTTP response: array of users
2. Get a user - URL: `/users/:id`, HTTP method: GET, HTTP response: requested user 
3. Create a new user - URL: `/users`, HTTP method: POST, HTTP request: user to be created, HTTP response: created user
4. Replace the entire user - URL: `/users/:id`, HTTP method: PUT, HTTP request: user to be replaced, HTTP response: replaced user
5. Update the user - URL: `/users/:id`, HTTP method: PATCH, HTTP request: user to be updated, HTTP response: updated user
6. Delete the user - URL: `/users/:id`, HTTP method: DELETE, HTTP response: deletion status

## Notes API
1. Get all notes - URL: `/notes`, HTTP method: GET, HTTP response: array of notes
2. Get a note - URL: `/notes/:id`, HTTP method: GET, HTTP response: requested note 
3. Create a new note - URL: `/notes`, HTTP method: POST, HTTP request: note to be created, HTTP response: created note
4. Replace the entire note - URL: `/notes/:id`, HTTP method: PUT, HTTP request: note to be replaced, HTTP response: replaced note
5. Update the note - URL: `/notes/:id`, HTTP method: PATCH, HTTP request: note to be updated, HTTP response: updated note
6. Delete the note - URL: `/notes/:id`, HTTP method: DELETE, HTTP response: deletion status

# Important Concepts

## How to make API fetch call from frontend
1. GET All:
```
const response = await fetch("http://localhost:9000/notes/");
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
const response = await fetch("http://localhost:9000/notes/", requestInfo);
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
curl -X PATCH http://localhost:9000/users/3 -H 'Content-Type: application/json' -d '{"name": "Rita", "password": "123456"}'
```
4. To create a new user resource
```
curl -X POST http://localhost:9000/users -H 'Content-Type: application/json' -d '{"name": "Saloni", "email": "sample4@example.com", "password": "123456"}'
```
5. To update a user with new user data
```
curl -X PUT http://localhost:9000/users/2 -H 'Content-Type: application/json' -d '{"name": "Saloni", "email": "sample1@example.com", "password": "123456"}'
```
6. To delete a user
```
curl -X DELETE http://localhost:9000/users/3
```

## Login API
1. To login user
```
curl -X POST http://localhost:9000/login -H 'Content-Type: application/json' -d '{"email": "manish@example.com", "password": "111111"}'
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
2. `app.use()` is used to setup a lot of things in the express app. One of the main example is to set our URL routers. Example: `app.use('/users', usersRouter);`

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
mongodb+srv://Cluster93678:Cluster93678@cluster93678.0n6ht8f.mongodb.net/notes_management?retryWrites=true&w=majority"
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

```mermaid
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

```mermaid
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

```mermaid
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
