const mongoose = require("mongoose");
const { databaseUrl } = require("../config");

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

async function connectDb() {
  await mongoose.connect(databaseUrl);

  // Gracefully disconnect from MongoDB when the server is stopped
  process.on("SIGINT", () => {
    disconnectDb().then(() => process.exit(0));
  });
  // Handle other exit signals (e.g., nodemon restarts)
  process.on("SIGTERM", () => {
    disconnectDb().then(() => process.exit(0));
  });
}

// Connect to the database
connectDb();
