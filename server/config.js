// TODO: Database URL and secrete key are sensitive and should not be part of git repo fo production config.
module.exports = {
    secretKey: "12345",
    databaseUrl: 'mongodb+srv://Cluster93678:saloni1234@cluster93678.0n6ht8f.mongodb.net/notes_management?retryWrites=true&w=majority',
    dbTimeoutInMs: 5000,
};