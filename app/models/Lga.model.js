const db = require("../config/dbConfig")
module.exports = (sequelize, Sequelize) => {
  const { validateLGA } = require("../utils/validateState");
  const NigeriaStatesLGAs = require("nigeria-states-lgas");
  const {statesLGAs} = require("../utils/validateLocalGovernment");
  
    const LocalGovernmentArea = sequelize.define('lga', {
      name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
        validate: {
          notEmpty: true,
          async validLGA(lga) {
            const state = await this.getState();
            const states = state.name.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
            const lgas = lga.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
            if (!statesLGAs[states].includes(lgas)) {
              throw new Error("Invalid Local Government Area");
            }
          }
        },
      },
      
    });
  
    LocalGovernmentArea.associate = function(models) {
      LocalGovernmentArea.belongsTo(models.state, { foreignKey: 'stateId' });
      LocalGovernmentArea.hasMany(models.operator, { foreignKey: 'lgaId', onDelete: "cascade" });
    };
  
    return LocalGovernmentArea;
  };