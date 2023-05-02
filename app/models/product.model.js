module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        productType: {
            type: Sequelize.ENUM('maize', 'rice'),
            allowNull: false,
        },
    })

    Product.associate = function(model) {
        Product.belongsTo(model.operator, {foreignKey: "operatorId",onDelete: "cascade"});
        Product.belongsTo(model.seed,{foreignKey: "seedId",onDelete:"cascade"})
    }
    return Product
}