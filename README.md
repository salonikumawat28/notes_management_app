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