module.exports = (sequelize, Sequelize) => {
    const Seed = sequelize.define("seed", {
        seedName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    Seed.associate = function(model) {
        Seed.belongsTo(model.product, {foreignKey: "productId",onDelete: "cascade"});
    }

    return Seed
}