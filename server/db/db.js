const mongoose = require("mongoose");

// Function to disconnect from MongoDB
const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error.message);
    process.exit(1);
  }
};

function connectDb() {
  mongoose.connect(
    "mongodb+srv://Cluster93678:saloni1234@cluster93678.0n6ht8f.mongodb.net/notes_management?retryWrites=true&w=majority"
  );

  // Gracefully disconnect from MongoDB when the server is stopped
  process.on("SIGINT", () => {
    disconnectDb().then(() => process.exit(0));
  });
  // Handle other exit signals (e.g., nodemon restarts)
  process.on("SIGTERM", () => {
    disconnectDb().then(() => process.exit(0));
  });
}

function connectDb() {
  mongoose.connect(
    "mongodb+srv://Cluster93678:saloni1234@cluster93678.0n6ht8f.mongodb.net/notes_management?retryWrites=true&w=majority"
  );
}

function getDbConnection() {
  return mongoose.connection;
}

const db = {
  connectDb,
  getDbConnection,
};

module.exports = db;
