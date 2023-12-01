import { sequelize, models } from "../models/database.js";
/**
 * @swagger
 * /api/vote:
 *   post:
 *     summary: Cria um novo voto
 *     parameters:
 *       - in: body
 *         name: vote
 *         description: O voto a ser criado, entrando com os parametros de name e value["f" ou "m"], caso a pessoa já tenha votado, retorna um erro.
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
 *               enum: [m, f]
 *     responses:
 *       200:
 *         description: O voto foi criado com sucesso
 */

// Controller para criar um novo voto
const createVote = async (req, res) => {
    try {
        const { name, value } = req.body;

        // Verificar se o nome já existe
        const existingVote = await models.Vote.findOne({ where: { name } });
        if (existingVote) {
            return res.status(409).json({ error: "Essa pessoa já votou" });
        }

        const vote = await models.Vote.create({ name, value });
        res.status(201).json(vote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/vote:
 *   get:
 *     summary: Retorna a lista de votos
 *     description: Retorna um array contendo todos os votos. Se um parâmetro de consulta "gender" for fornecido com o valor "m" ou "f", retorna apenas os votos correspondentes ao gênero.
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [m, f]
 *         description: O gênero para filtrar os votos
 *     responses:
 *       200:
 *         description: A lista de votos
 */
// Controller para obter todos os votos
const getAllVotes = async (req, res) => {
    try {
        const { gender } = req.query;
        let votes;

        if (gender === "m" || gender === "f") {
            votes = await models.Vote.findAll({
                where: {
                    value: gender,
                },
            });
        } else {
            votes = await models.Vote.findAll();
        }

        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Outros controladores (update, delete) podem ser adicionados conforme necessário

export default {
    createVote,
    getAllVotes,
};
