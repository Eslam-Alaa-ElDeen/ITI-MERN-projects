import { port } from "../config/config.service.js";
import { connectionDB } from "./DB/connection.db.js";
import { globalErrorHandling } from "./middleware/index.js";
import { noteRouter, userRouter } from "./modules/index.js";
import express from "express";

const app = express();
app.use(express.json());

connectionDB();

app.get("/", (req, res) => res.json({msg:"welcome to Eslam_3laa server"}));
app.use("/note", noteRouter);
app.use("/user", userRouter);

app.use("{/*dummy}", (req, res) => {
  return res.status(404).json({ message: "Invalid application routing" });
});

app.use(globalErrorHandling);

app.listen(port, () => console.log(`sticky_note app listening on port ${port}!`));
