const auth = require('../middleware/authorization');
const student = require('../middleware/student');
const studentCreator = require('../middleware/student_creator');
const assignmentCreator = require('../middleware/assignment_creator');
const spelling_score = require('../services/spelling_score');
const grammer_score = require('../services/grammer_score');
const relevance_score = require('../services/relevance_score');
const express = require('express');
const models = require('../models');
const Assignment = models.Assignment;
const User = models.User;
const router = express.Router();

// create or delete an assessment
router.post('/', [auth, assignmentCreator, studentCreator] , async(req, res) => {
  // action unassign
  if(req.body.action ==="unassign"){
    await req.student.removeAssessment(req.assignment);
    return res.send({assignment: req.assignment, message: 'successfully unassigned'});
  }
  // action assign or simply not unassign
  await req.student.addAssessment(req.assignment);

  // Need to broadcast an event (using pub sub model, probably will be using rabbitmq) which create a leaderboard
  // entry for the student if it doesn't exist.
  if(!await req.student.getLeaderboard()){
    const leaderboard = await req.student.createLeaderboard({ spellingScore: 0, grammerScore: 0, relevanceScore: 0, total: 0 });
  }
  res.send({assignment: req.assignment, message: 'successfully assigned'});
});

// submit an assessment
router.post('/:assignmentId/submit', [auth, student], async(req,res) =>{
  // check for params
  const answerText = req.body.text;
  if(!answerText){
    return res.status(400).send({error: 'Invalid params'});
  }

  // check for assignment
  const assignment = await Assignment.findOne({where: {id: req.params.assignmentId}});
  if (!await req.user.hasAssessment(assignment)){
    return res.status(401).send(`user doesn't have access to submit the assignmnet`);
  }
  const spellingScore = await spelling_score(answerText);
  const relevanceScore = await relevance_score(answerText, [assignment.title]); // need to have additional column in assignment called tags
  const grammerScore = await grammer_score(answerText);
  const total = spellingScore + grammerScore + relevanceScore;
  const submission = await req.user.createSubmission({
    spellingScore: spellingScore,
    grammerScore: grammerScore,
    relevanceScore: relevanceScore,
    total: total,
    assignmentId: req.params.assignmentId
  });

  // Need to broadcast another event which will update the leaderboard
  let leaderboard = await req.user.getLeaderboard();
  if(!leaderboard){
    leaderboard = await req.user.createLeaderboard({
      spellingScore: spellingScore,
      grammerScore: grammerScore,
      relevanceScore: relevanceScore,
      total: total
    });
  } else{
    leaderboard.update({
      spellingScore: leaderboard.get('spellingScore') + spellingScore,
      grammerScore: leaderboard.get('grammerScore') + grammerScore,
      relevanceScore: leaderboard.get('relevanceScore') + relevanceScore,
      total: leaderboard.get('total') + total
    });
  }

  res.send({submission: submission});
});

module.exports = router;
