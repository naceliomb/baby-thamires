export default (sequelize, DataTypes) => {
    const Vote = sequelize.define("Vote", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: "0",
        },
    });

    return Vote;
};
