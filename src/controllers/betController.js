import { sequelize, models } from "../models/database.js";
/**
 * @swagger
 * /api/bet:
 *   post:
 *     summary: Cria um novo voto
 *     parameters:
 *       - in: body
 *         name: bet
 *         description: A posta a ser criada, para isso entre com uma data e um nome, caso a pessoa já tenha apostado, retorna um erro.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - value
 *           properties:
 *             name:
 *               type: string
 *             value:
 *               type: datetime
 *     responses:
 *       200:
 *         description: A posta foi criada com sucesso
 */

// Controller para criar um novo voto
const createBet = async (req, res) => {
    try {
        const { name, value } = req.body;

        // Verificar se o nome já existe
        const existingBet = await models.Bet.findOne({ where: { name } });
        if (existingBet) {
            return res.status(409).json({ error: "Essa pessoa já apostou" });
        }

        const bet = await models.Bet.create({ name, value });
        res.status(201).json(bet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/bet:
 *   get:
 *     summary: Retorna a lista de apostas
 *     description: Retorna um array contendo todos as apostas.
 *     parameters:
 *         schema:
 *           type: object
 *         description: Retorna uma array contendo todas as apostas
 *     responses:
 *       200:
 *         description: A lista de votos
 */
// Controller para obter todos os votos
const getAllBets = async (req, res) => {
    try {
        
            bets = await models.Bet.findAll();
        

        res.status(200).json(bets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Outros controladores (update, delete) podem ser adicionados conforme necessário

export default {
    createBet,
    getAllBets,
};
