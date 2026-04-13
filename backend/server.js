import mongoose from "mongoose";
import app from "./src/app.js";

import "dotenv/config";

const PORT = process.env.PORT;

const connection = async () => {
  try {
    const DB_HOST = process.env.DB_HOST;
    if (!DB_HOST) {
      throw new Error("DB_HOST is not defined in .env file");
    }

    await mongoose.connect(DB_HOST);
    console.log("The database was successfully connected");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connection();

    app.listen(PORT, () => {
      console.log(`The server has started on,  http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
};

startServer();

// app.listen(PORT, () => {
//   console.log(`The server has started on,  http://localhost:${PORT}`);
// });
