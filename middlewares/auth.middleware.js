const con= require('../mysql');

module.exports.requireAuth = function(req,res,next){
	if(!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}
	let sql = "SELECT * FROM users WHERE id=?";
	con.query(sql, [req.signedCookies.userId] , (err, response) => {
        if (err) throw err
        let user= response;
		if(!user){
			res.redirect('auth/login');
			return;
		}
	})

	next();
};

module.exports.requireWelcome = function(req,res,next){
	if(req.signedCookies.userId){
		res.redirect('/home');
		next();
	} else {
		res.render('index');
	}
};