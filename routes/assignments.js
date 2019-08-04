const auth = require('../middleware/authorization');
const instructor = require('../middleware/instructor');
const student = require('../middleware/student');
const creator = require('../middleware/assignment_creator');
const express = require('express');
const models = require('../models');
const Assignment = models.Assignment;
const router = express.Router();

// create an assesment i.e create
router.post('/', [auth, instructor] , async(req, res) => {
  if(!req.body.title || !req.body.problemText){
    return res.status(400).send({error: 'Invalid params'});
  }
  const assignment = await Assignment.create({
    title: req.body.title,
    problemText: req.body.problemText,
    maxMark: req.body.maxMark,
    creatorId: req.user.id
  });
  res.status(201).send({assignment: assignment});
});

// show an assesment i.e show
router.get('/:id', auth, async(req, res) => {
  const assignment = await Assignment.findOne({where: {id: req.params.id}});
  res.status(200).send({assignment: assignment});
});


// update an assesment  i.e put
router.put('/:id', [auth, instructor, creator], async(req, res) => {
  if(!req.body){
    return res.status(400).send({error: 'Invalid params'});
  }
  const assignment = await req.assignment.update(req.body);
  res.send({assignment: assignment});
});

// delete an assesment
router.delete('/:id',[auth, instructor, creator], async(req, res) =>{
  await req.assignment.destroy();
  res.send({assignment: req.assignment})
});

module.exports = router;
