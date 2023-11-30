import { sequelize, models } from "../models/database.js";

// Controller para criar um novo voto
const createVote = async (req, res) => {
    try {
        const { name, value } = req.body;
        const vote = await models.Vote.create({ name, value });
        res.status(201).json(vote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller para obter todos os votos
const getAllVotes = async (req, res) => {
    try {
        const { gender } = req.query;
        let votes;

        if (gender === "m" || gender === "f") {
            votes = await models.Vote.findAll({
                where: {
                    gender: gender
                }
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

