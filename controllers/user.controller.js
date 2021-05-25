const con = require('../mysql');
const shortid = require('shortid');

//list users
module.exports.index = function (req, res) {
	let sql1 = 'SELECT * FROM users';
	let sql2 = 'SELECT * FROM threet1.work';
	con.query(sql1 + "; " + sql2, (err, response)  => {
		if (err) throw err
		res.render('users/index', {
			users: response[0],
			works: response[1]
		});
	});
	// con.query(sql1 + "; " + sql2, function(err, results) {
	// 	if (err) throw err;
	// 	// `results` is an array with one element for every statement in the query:
	// 	console.log(results[0]); // [{1: 1}]
	// 	console.log(results[1]); // [{2: 2}]
	//   });
};

module.exports.create = function (req, res) {
	if(req.signedCookies.userId){
		res.redirect('../home');
		return;
	} else res.render('users/create');
};

//view users
module.exports.get = function (req, res) {
	let id = req.signedCookies.userId;
	let sql = "SELECT * FROM users WHERE id=?";

	con.query(sql, [id], (err, response) => {
		if (err) throw err
		res.render('users/view', {
			user: response[0]
		});
	})
};
//Hiển thị ra trang changeProfile
module.exports.getchangeProfile = function (req, res) {
	let id = req.signedCookies.userId;
	let sql = "SELECT * FROM users WHERE id=?";

	con.query(sql, [id], (err, response) => {
		if (err) throw err
		res.render('users/changeProfile', {
			user: response[0]
		});
	})
};
// change profile
module.exports.changeAvatar = function (req, res) {
	let id = req.signedCookies.userId;
	let sql = "UPDATE users SET ? WHERE id=?";
	console.log(req);
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	let data = req.body;

	con.query(sql, [data, id], (err, response) => {
		if (err) throw err
		res.redirect('/users/view');
	})
};
module.exports.changeInfo = function (req, res) {
	let id = req.signedCookies.userId;
	let sql = "UPDATE users SET ? WHERE id=?";
	let data = req.body;

	con.query(sql, [data, id], (err, response) => {
		if (err) throw err
		res.redirect('/users/view');
	})
};
module.exports.changePass = function (req, res) {
	let id = req.signedCookies.userId;
	let sql1 = "SELECT * FROM users WHERE id=?";

	con.query(sql1, [id], (err, response) => {
		if (err) throw err
		if (response[0].password != req.body.password) {
			res.send(" Mật khẩu không đúng ! ");
			// res.render('users/changeProfile',{
			// 	errors: [
			// 	'Mật khẩu không đúng'],
			// 	user: response[0],
			// 	values: req.body
			// });
			// return;
		}
		else {
			let sql = "UPDATE users SET password = ? WHERE id=?";
			let data = req.body.rePass;
			con.query(sql, [data, id], (err, response) => {
				if (err) throw err
				res.redirect('/users/view');
			})
		}
	})
};


//create user(register)
module.exports.postCreate = function (req, res) {
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	let data = req.body;

	let sql = 'INSERT INTO users SET ?';
	con.query(sql, [data], (err, response) => {
		if (err) throw err
		res.redirect('/auth/login');
	})
};