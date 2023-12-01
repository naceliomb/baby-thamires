import express from "express";
import voteRoutes from "./routes/voteRoutes.js";
import { sequelize, synchronizeModels } from "./models/database.js";
import cors from "cors";
import { swaggerUi, swaggerDocs } from "../swagger.js";
import bet from "./models/bet.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", voteRoutes);
app.use("/api", bet);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

synchronizeModels().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
