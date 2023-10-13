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
```

# Important Concepts
## How to change listening port in Express.js
To change the listening port of the server in Express.js, go to `bin -> www` and update 
```
var port = normalizePort(process.env.PORT || '9000');
```