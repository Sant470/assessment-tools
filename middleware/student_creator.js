const models = require('../models');
const User = models.User;

module.exports = async function(req, res, next){
  // check for params
  const userId = req.params.id || req.body.userId
  if(!userId) return res.status(400).send({error: 'Invalid params'});

  // check for object
  let student = await User.findOne({where: {id: req.params.id || req.body.userId}});
  if(!student || !student.active){
    return res.status(404).send({error: `No such student exists with user id: ${userId}`});
  }

  // check for privilege
  if(!await req.user.hasStudent(student)){
    return res.status(401).send({error: 'Unauthorized Access'});
  }
  req.student = student;
  next();
};
