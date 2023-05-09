
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
                const states = state.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
                if (!validStates.includes(states)) {
                    throw new Error("Invalid State")
                }
            }
        },
      },
      isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
      
    });
    State.associate = function(models) {
      State.hasMany(models.operator,{ foreignKey: 'stateId', onDelete: "cascade" });
    };

    State.afterSync(async () => {
      const validStates = NigeriaStatesLGAs.states();
      const existingStates = await State.findAll({
        attributes: ['name'],
      });
      const existingStateNames = existingStates.map(s => s.name);
  
      const newStates = validStates.filter(s => !existingStateNames.includes(s));
      const stateRecords = newStates.map(s => ({ name: s }));
  
      if (stateRecords.length) {
        await State.bulkCreate(stateRecords);
      }
    });
  
    return State;
  };