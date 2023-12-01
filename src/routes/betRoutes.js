import express from "express";
import betController from "../controllers/betController.js";

const router = express.Router();

// Rotas para manipulação de usuários
router.post("/bet", betController.createBet);

router.get("/bet", betController.getAllBets);

// Outras rotas (update, delete) podem ser adicionadas conforme necessário
export default router;
