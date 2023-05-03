function validateRegister(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // Check email validity
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).send({error: 'Invalid email address'});
  }

  // Check password length and complexity
  if (!password || password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return res.status(400).send({error: 'Password must be at least 6 characters long and contain at least one uppercase letter and one number'});
  }

  next();
}


module.exports = {validateRegister}