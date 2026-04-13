import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routes/api/users.js";
import contactsRouter from "./routes/api/contacts.js";
import "./config/config.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Welcome to phonebook",
  });
});

app.use((_, res) => {
  res.status(404).json({
    message: "File or Route not found",
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: statusCode === 500 ? "fail" : "error",
    code: statusCode,
    message: err.message,
    data: statusCode === 500 ? "Internal Server Error" : err.data || null,
  });
});

export default app;
