const auth = require('../middleware/authorization');
const instructor = require('../middleware/instructor');
const student = require('../middleware/student');
const creator = require('../middleware/assignment_creator');
const express = require('express');
const models = require('../models');
const Assignment = models.Assignment;
const router = express.Router();


// create an assignment i.e create
router.post('/', [auth, instructor] , async(req, res) => {
  if(!req.body.title || !req.body.problemText){
    return res.status(400).send({error: 'Invalid params'});
  }
  const assignment = await req.user.createAssignment(req.body);
  res.status(201).send({assignment: assignment});
});

// show an assignment i.e show
router.get('/:id', auth, async(req, res) => {
  const assignment = await Assignment.findOne({where: {id: req.params.id}});
  res.status(200).send({assignment: assignment});
});


// update an assignment  i.e put
router.put('/:id', [auth, creator], async(req, res) => {
  const assignment = await req.assignment.update(req.body);
  res.send({assignment: assignment});
});

// delete an assignment
router.delete('/:id',[auth, creator], async(req, res) =>{
  await req.assignment.destroy();
  res.send({assignment: req.assignment});
});

module.exports = router;
