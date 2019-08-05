const models = require('../models');
const User = models.User;

module.exports = async function(req, res, next){
  let student= await User.findOne({where: {id: req.params.id, creatorId: req.user.id}});
  if(!student){
    return res.status(403).send({error: `Access Denied`});
  }
  req.student = student;
  next();
};
