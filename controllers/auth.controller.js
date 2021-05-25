const con= require('../mysql');

module.exports.login=function(req,res){
	if(req.signedCookies.userId){
		res.redirect('../home');
		return;
	} else res.render('auth/login');
};
module.exports.postLogin = function(req,res){
	let email=req.body.email;
	let password =req.body.password;
	let sql = 'SELECT * FROM users WHERE email= ? ';
	con.query(sql, [email] , (err, response)=>{
		if (err) throw err
		let user= response;

		if(user=="" ) {
			res.render('auth/login',{
				errors: [
				'User doesn not exists.'],
				values: req.body
			});
			return;
		}
		if(user[0].password!==password){
			res.render('auth/login',{
				errors: [
				'Wrong password.'],
				values: req.body
			});
			return;
		}
		res.cookie('userId',user[0].id,{
			signed: true
		});
		res.redirect('/home');
	})
};

module.exports.postLogout = function(req,res){
	res.clearCookie('userId');
	res.redirect('/');
};