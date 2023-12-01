import { sequelize, models } from "../models/database.js";
/**
 * @swagger
 * /api/bet:
 *   post:
 *     summary: Cria uma nova aposta
 *     parameters:
 *       - in: body
 *         name: bet
 *         description: A aposta a ser criada, para isso entre com uma data e um nome, caso a pessoa já tenha apostado, retorna um erro.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - value
 *           properties:
 *             name:
 *               type: string
 *             value:
 *               type: string
 *               format: date-time
 *     responses:
 *       200:
 *         description: A aposta foi criada com sucesso
 *       409:
 *         description: Essa pessoa já apostou
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
 *     description: Retorna um array contendo todas as apostas.
 *     responses:
 *       200:
 *         description: A lista de apostas
 */
// Controller para obter todos os votos
const getAllBets = async (req, res) => {
    try {
        const bets = await models.Bet.findAll();
        if(bets.length === 0){
            return res.status(404).json({ error: "Não há apostas" });
        }

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
