module.exports = function(req, res, next){
  if(req.user.userType !== "I") return res.status(403).send('Access Denied');
  next();
};
