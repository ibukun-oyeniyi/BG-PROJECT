
module.exports = (sequelize, Sequelize) => {
    const { validateState } = require("../utils/validateState");
    const NigeriaStatesLGAs = require("nigeria-states-lgas");
    const statesLGAs = {}
    const validStates = NigeriaStatesLGAs.states()
    validStates.forEach(state => {
        const lgas = NigeriaStatesLGAs.lgas(state);
        statesLGAs[state] = lgas;
    });
    const State = sequelize.define('state', {
      name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
        validate: {
            notEmpty: true,
            async validState(state) {
                if (!validStates.includes(state)) {
                    throw new Error("Invalid State")
                }
            }
        },
      },
      
    });
    State.associate = function(models) {
      State.hasMany(models.operator,{ foreignKey: 'stateId', onDelete: "cascade" });
    };
    return State;
  };