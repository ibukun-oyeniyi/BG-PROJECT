function validateLogin(req, res, next) {
    const email = req.body.email;
  
    // Check email validity
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).send({error: 'Invalid email address'});
    }
    next();
  }
  
  
  module.exports = {validateLogin}