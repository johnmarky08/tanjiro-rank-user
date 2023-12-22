import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createRank, getRank } from "../controller/rank.js";
import mongoose from "mongoose";
import { preData } from "./id.js";
import Rank from "../model/Rank.js";

const port = process.env.PORT || process.env.port || 5555,
  app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.set("json spaces", 2);

app.get("/", function (req, res) {
  res.json({
    author: "John Arida",
    code: 200,
    message: "Tanjiro's User Rank Database Is Online!",
    use: "/get or /update",
  });
});

app.get("/update", createRank);
app.get("/get", getRank);

app.use((error, req, res, next) => {
  res.status(error.status).json({ message: error.message });
});

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    Rank.insertMany(preData)
  })
  .catch((error) => console.log(`${error} did not connect`));
