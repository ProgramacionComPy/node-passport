exports.index = function(req, res){
  res.render('index', { 
    title: 'Passport-Example',
    user: req.user
  });
};