import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import connection from "./DB/database.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Server is running on port", PORT);
  } catch (error) {
    res.status(500).send(error);
  }
});
