const { comparePassword } = require('../lib/bcrypt-client');
const express = require('express');
const models = require('../models');
const User = models.User;

const router = express.Router();

// authenticate user
router.post('/', async(req,res) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).send({error: 'email or password is missing'});
  }
  const user =  await User.findOne({where: {email: req.body.email}});
  if(!user) return res.status(401).send({error: 'Invalid email or password'});

  const validPassword = await comparePassword(req.body.password, user.password);
  if(!validPassword) return res.status(401).send({error: 'Invalid email or password'});
  res.send({user: user, authToken: user.generateAuthToken()});
});


module.exports = router;
