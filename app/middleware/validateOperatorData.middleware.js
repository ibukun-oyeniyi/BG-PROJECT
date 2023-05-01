function validateOperatorData(req, res, next) {
    const { firstName, lastName, phone, nationality, sex, dateOfBirth, nin,state, lga } = req.body;
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
        const message = `Please provide all required user data. Missing fields: ${missingFields.join(', ')}.`;
        return res.status(400).json({ message });
    }
    
    // Add the userId, state, and localGovernment to the request body
    req.body = {state, lga, firstName, lastName, phone, nationality, sex, dateOfBirth, nin };
    
    next();
    }

module.exports = { validateOperatorData }