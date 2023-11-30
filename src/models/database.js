import { Sequelize } from "sequelize";
import VoteModel from "./vote.js";
import { config } from "dotenv";
//carregar variaveis de ambiente
config();
//iniciar sequelize
const sequelize = new Sequelize({
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    // outras configurações do banco de dados, se necessário
});

const models = {
    Vote: VoteModel(sequelize, Sequelize),
    // adicione outros modelos conforme necessário
};

const synchronizeModels = async () => {
    await sequelize.sync();
};

export { sequelize, models, synchronizeModels };
