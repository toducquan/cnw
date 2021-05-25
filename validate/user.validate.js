const con = require('../mysql');
module.exports.postCreate = function(req,res,next){
	var errors=[];
	if(!req.body.name){
		errors.push('Tên không được để trống');
	}
	if(!req.body.email){
		errors.push('Email không được để trống');
	}
	if(!req.body.password){
		errors.push('Mật khẩu không được để trống');
	}
	var sql = 'SELECT * FROM users WHERE email= ?';
	if(errors.length){
		res.render('users/create',{
			errors:errors
		});
		return;
	}
	con.query(sql, req.body.email , (err, response)=>{
		if (err) throw err;
		// console.log(response.length);
		var errors=[];
		if (response.length>=1) errors.push('Email đã được đăng ký');
		if(errors.length){
			res.render('users/create',{
				errors:errors
			});
			return;
		}
		next();
	})
};