const models = require('../models');
const Assignment = models.Assignment;

module.exports = async function(req, res, next){
  let assignment = await Assignment.findOne({where: {id: req.params.id, creatorId: req.user.id}});
  if(!assignment){
    return res.status(403).send({error: `Access Denied`});
  }
  req.assignment = assignment
  next();
};
