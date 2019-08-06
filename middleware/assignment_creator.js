const models = require('../models');
const Assignment = models.Assignment;

module.exports = async function(req, res, next){
  // check for params
  let assignmentId = req.params.id || req.body.assignmentId;
  if(!assignmentId) return res.status(400).send({error: 'Invalid params'});

  // check for object
  let assignment = await Assignment.findOne({where: {id: assignmentId}});
  if(!assignment){
    return res.status(404).send({error: `No such assignment exists with id: ${assignmentId}`});
  }

  // check for privilege
  if(!await req.user.hasAssignment(assignment)){
    return res.status(401).send({error: 'Unauthorized Access'});
  }
  req.assignment = assignment;
  next();
};
