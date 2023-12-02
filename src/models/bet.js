export default (sequelize, DataTypes) => {
    const Bet = sequelize.define("Bet", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return Bet;
};
