const NigeriaStatesLGAs = require("nigeria-states-lgas");
const validateState = (value,options) => {
    const NigerianStates = NigeriaStatesLGAs.states()
    if (!NigerianStates.includes(value)) {
      throw new Error('State must be a valid Nigerian state');
    }
  };

module.exports = { validateState}