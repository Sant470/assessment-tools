module.exports = function(req, res, next){
  if(req.user.userType !== "L") return res.status(403).send('Access Denied');
  next();
};
