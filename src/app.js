import express from "express";
import voteRoutes from "./routes/voteRoutes.js";
import { sequelize, synchronizeModels } from './models/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/api", voteRoutes);

app.get("/", (req, res) => {
    res.send("Olá, mundo!");
});

synchronizeModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});