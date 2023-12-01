import express from "express";
import voteRoutes from "./routes/voteRoutes.js";
import { sequelize, synchronizeModels } from "./models/database.js";

import { swaggerUi, swaggerDocs } from "../swagger.js";

const app = express();
var cors = require('cors')
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://192.168.1.103:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  
    // Intercepta as solicitações OPTIONS e retorna imediatamente para evitar a execução do resto do middleware
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  
    // Permite que o Express continue a execução do middleware pipeline
    next();
  });

app.use(express.json());

app.use("/api", voteRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

synchronizeModels().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
