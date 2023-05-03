const NigeriaStatesLGAs = require("nigeria-states-lgas");
const {statesLGAs} = require("../utils/validateLocalGovernment");
function validateOperatorData(req, res, next) {
  const {
    firstName,
    lastName,
    phone,
    nationality,
    sex,
    dateOfBirth,
    nin,
    state,
    lga,
  } = req.body;
  // Validate the user data
  const missingFields = [];
  if (!firstName) missingFields.push('firstName');
  if (!lastName) missingFields.push('lastName');
  if (!phone) missingFields.push('phoneNumber');
  if (!nationality) missingFields.push('nationality');
  if (!sex) missingFields.push('sex');
  if (!dateOfBirth) missingFields.push('dateOfBirth');
  if (!nin) missingFields.push('nin');
  if (!state) missingFields.push('state');
  if (!lga) missingFields.push('lga');

  if (missingFields.length > 0) {
    const message = `Please provide all required user data. Missing fields: ${missingFields.join(
      ', '
    )}.`;
    return res.status(400).json({ message });
  }
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  if (!phoneRegex.test(phone)) {
    const message =
      'Invalid phone number format. Must be in the format +1238022334499 and between 9 and 15 digits.';
    return res.status(400).json({ message });
  }

  const ninRegex = /^\d{11}$/;
  if (!ninRegex.test(nin)) {
    const message =
      'Invalid nin. Must be 11 digits';
    return res.status(400).json({ message });
  }

  // Validate the state
  const validStates = NigeriaStatesLGAs.states();
  if (!validStates.includes(state)) {
    const message = 'Invalid state.';
    return res.status(400).json({ message });
  }

  //Validate the LGA
  try{
    if (!statesLGAs[state].includes(lga)) {
        const message = 'Invalid local government area.';
        return res.status(400).json({ message });
      }
  }catch(err){
    const message = 'Invalid local government area.';
    return res.status(400).json({ message });
  }
  

  // Add the userId, state, and localGovernment to the request body
  req.body = {
    state,
    lga,
    firstName,
    lastName,
    phone,
    nationality,
    sex,
    dateOfBirth,
    nin,
  };

  next();
}

module.exports = { validateOperatorData };
