import express from "express";
import cors from "cors";
import mongoose from "mongoose";


import { userRouter } from "./routes/user.js";

import { interventionRouter } from "./routes/intervention.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/intervention", interventionRouter);


mongoose.connect(
  "mongodb+srv://gmaoensam:1gnIO6I5DZfLSfRD@cluster0.03kr78z.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => console.log("Server started"));