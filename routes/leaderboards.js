const auth = require('../middleware/authorization');
const express = require('express');
const models = require('../models');
const db = require('../models/index');
const LeaderBoard = models.LeaderBoard;
const User = models.User;
const router = express.Router();


// get leaderboards
router.get('/', auth , async(req, res) => {
  if(req.user.userType === "L"){
    if(!await req.user.getLeaderboard()){
      return res.status(400).send({error: 'leaderboard not available'});
    }
    const leaderboard = await db.sequelize.query(
      `SELECT "userId","spellingScore","grammerScore","relevanceScore", "total", rank FROM
      ( SELECT "userId","spellingScore","grammerScore","relevanceScore", "total",rank() OVER (ORDER BY "total" DESC)as rank from "LeaderBoards")t
      where "userId"=${req.user.id}`
    );
    return res.send({leaderboard: leaderboard[0][0]});
  }
  // return students along with the leaderboard of each student
  const users = await User.findAll({where: {userId: req.user.id}, include: [{model: models.LeaderBoard, as: 'leaderboard'}]});
  res.send({users: users});
});
module.exports = router;
