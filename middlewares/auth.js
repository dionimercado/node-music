exports.loginRequired = (req,res,next) => {
  if(!req.isAuthenticated()){
    req.flash('error', 'Please log in!');
    res.redirect('/signin');
  } else {
    next();
  }
};

exports.ensureCorrectUser = (req,res,next) => {
  if(req.user.id !== req.params.id){
    req.flash('error', 'Unauthorized!');
    res.redirect('/users');
  }
};
