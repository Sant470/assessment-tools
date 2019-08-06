const auth = require('../middleware/authorization');
const instructor = require('../middleware/instructor');
const creator = require('../middleware/student_creator');
const express = require('express');
const models = require('../models');
const User = models.User;
const router = express.Router();

// create an student i.e create
router.post('/', [auth, instructor] , async(req, res) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).send({error: 'Invalid params'});
  }
  const student = await req.user.createStudent({
    email: req.body.email,
    name: req.body.name || req.body.email.split("@")[0],
    password: req.body.password,
    userType: "L",
    active: true
  });
  res.status(201).send({student: student});
});

// show an student i.e show
router.get('/:id', auth, async(req, res) => {
  const student = await User.findOne({where: {id: req.params.id}});
  res.send({student: student});
});


// update an student  i.e put
router.put('/:id', [auth, creator], async(req, res) => {
  const student = await req.student.update(req.body);
  res.send({student: student});
});

// delete an student
router.delete('/:id',[auth, creator], async(req, res) =>{
  const student = await req.student.update({active: false});
  res.send({student: student});
});

module.exports = router;
