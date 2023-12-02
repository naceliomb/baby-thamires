import express from "express";
import voteRoutes from "./routes/voteRoutes.js";
import { sequelize, synchronizeModels } from "./models/database.js";

import { swaggerUi, swaggerDocs } from "../swagger.js";

const app = express();
var cors = require('cors')
const PORT = process.env.PORT || 3000;

app.use(cors(origin));

app.use(express.json());

app.use("/api", voteRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

synchronizeModels().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
