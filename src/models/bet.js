export default (sequelize, DataTypes) => {
    const Bet = sequelize.define("Bet", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.DATETIME,
            allowNull: false,
        },
    });

    return Bet;
};
