import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createSim, getSim } from "../controller/sim.js";
import mongoose from "mongoose";

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
    message: "Tanjiro's Simsimi Database Is Online!",
    use: "/sim or /teach",
  });
});

app.get("/teach", createSim);
app.get("/sim", getSim);

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
  })
  .catch((error) => console.log(`${error} did not connect`));
