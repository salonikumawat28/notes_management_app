const mongoose = require('mongoose');

function connectDb() {
    mongoose.connect("mongodb+srv://Cluster93678:saloni1234@cluster93678.0n6ht8f.mongodb.net/notes_management?retryWrites=true&w=majority");
}

function getDbConnection() {
    return mongoose.connection;
}

const db = {
    connectDb,
    getDbConnection
}

module.exports = db;