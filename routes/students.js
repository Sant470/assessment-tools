const auth = require('../middleware/authorization');
const instructor = require('../middleware/instructor');
const express = require('express');
const models = require('../models');
const Assignment = models.Assignment;
const router = express.Router();

// create an student i.e create
router.post('/', [auth, instructor] , async(req, res) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).send({error: 'Invalid params'});
  }
  const student = await User.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name || req.body.email.split("@")[0],
      password: req.body.paasword,
      userType: "L",
      active: true,
      creatorId: req.user.id,
    }});
  res.status(201).send({student: student});
});

// show an student i.e show
router.get('/:id', auth, async(req, res) => {
});


// update an student  i.e put
router.put('/:id', [auth, instructor, creator], async(req, res) => {

});

// delete an student
router.delete('/:id',[auth, instructor, creator], async(req, res) =>{

});

module.exports = router;
