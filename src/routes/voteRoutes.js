import express from "express";
import voteController from "../controllers/voteController.js";

const router = express.Router();

// Rotas para manipulação de usuários
router.post("/vote", voteController.createVote);

router.get("/vote", voteController.getAllVotes);

// Outras rotas (update, delete) podem ser adicionadas conforme necessário
export default router;
