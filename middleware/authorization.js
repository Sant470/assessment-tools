const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.User;

module.exports = async function(req, res, next){
  const authorization = req.header('Authorization');
  if(!authorization) return res.status(401).send('Access Denied, no Authorization token provided');
  try {
    const payload = jwt.decode(authorization, 'privatekey');
    req.user = await User.findOne({where: { email:  payload.email}});
    next();
  } catch(ex){
    console.log(ex);
    res.status(400).send('Invalid Authorization Token');
  }
};
