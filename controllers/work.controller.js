const con = require('../mysql');
const shortid = require('shortid');

var _this = this;

module.exports.index = function (req, res) {
	
	let sql = "SELECT * FROM users WHERE id=?";
	let sql1 = "SELECT * FROM threet1.work where id = ?";
	let sql2 = "SELECT card.* FROM threet1.card, threet1.work where threet1.work.id = ? and threet1.work.id = card.list_work_id"
	let sql3 = "select distinct threet1.list.id, threet1.list.name FROM threet1.work, threet1.list where threet1.work.id = ? and threet1.work.id = threet1.list.work_id"
	let sql4 = "select comment.*, users.name, users.avatar, users.id as member_id, comment_has_card.card_id from comment, threet1.work, comment_has_card, comment_has_member, users where comment.id = comment_has_card.comment_id and comment.id = comment_has_member.comment_id and users.id = comment_has_member.member_id and card_list_work_id = work.id and work.id = ?"


	con.query(sql+"; "+sql1 + "; " + sql2 + "; "+ sql3 + "; " + sql4, [req.signedCookies.userId, req.query.id, req.query.id, req.query.id, req.query.id], (err, response) => {
		if (err) throw err
		var m = new Set();
		response[3].forEach(function(item, index) {
			m.add(item);
		});
		var array = Array.from(m); 
		// console.log(req.query.id);
		res.render('work/index', {
			user: response[0][0],
			work: response[1][0],
			cards: response[2],
			list: array,
			comments: response[4]
		});
	})
};


module.exports.postIndex = function (req, res) {
	req.body.id = shortid.generate();
	req.body.background = req.file.path.split('\\').slice(1).join('/');
	var data = req.body;
	// console.log(data);
	let sqlInit = "SELECT team.* FROM team, team_has_member, users where team.name = ? and users.id = '"+req.signedCookies.userId+"' and team.id = team_has_member.team_id and users.id = team_has_member.member_id";
	con.query(sqlInit, data.team_id, (err, rs) => {
		if (err) throw err;
		if (rs.length != 0) {
			data.team_id = rs[0].id;
			// console.log(data);
			let sql = "INSERT INTO work SET ?";
			// let sql0 = `INSERT INTO team_has_member VALUES (?, ?)`;
			let sql1 = "SELECT * FROM users WHERE id=?";
			let sql2 = "SELECT * FROM work WHERE id=?";
			// tao team moi
			con.query(sql + "; "+ sql1 + "; " + sql2, [data, req.signedCookies.userId, req.body.id], (err, response) => {
				if (err) throw err
				res.redirect('/work?id='+response[2][0].id);
			})
		}
		else {
			var s = {
				"id": shortid.generate(),
				"name": data.team_id,
				"type": null,
				"description": null
			}
			let sql = "INSERT INTO team Set ?";
			con.query(sql, s, (err, rs) => {
				data.team_id = s.id;
				let sql = "INSERT INTO work SET ?";
				let sql1 = "SELECT * FROM users WHERE id=?";
				let sql2 = "SELECT * FROM work WHERE id=?";
				let sql0 = `INSERT INTO team_has_member VALUES (?, ?)`;
				// tao team moi
				con.query(sql + "; " + sql1 + "; " + sql2 + "; "+ sql0, [data, req.signedCookies.userId, req.body.id, s.id , req.signedCookies.userId], (err, response) => {
					if (err) throw err
					res.redirect('/work?id='+response[2][0].id);
				})
			})
		}
	})
};

module.exports.changeBgWork= function(req,res){
	let id= req.params.id;
	console.log(id);
	let sql = "UPDATE threet1.work SET background=? WHERE id=?";
	req.body.changeBgWork = req.file.path.split('\\').slice(1).join('/');
	let data = req.body.changeBgWork;

	con.query(sql, [data, id], (err, response) => {
		if (err) throw err
		res.redirect(req.get('referer'));
	})
}
module.exports.deleteWork= function(req,res){
	let id= req.params.id;
	let sql = "DELETE FROM threet1.comment_has_card WHERE card_list_work_id=?";
	let sql1 = "DELETE FROM threet1.card WHERE list_work_id=?";
	let sql2 = "DELETE FROM threet1.list WHERE work_id=?";
	let sql3 = "DELETE FROM threet1.work WHERE id=?";
	con.query(sql+";"+sql1+";"+sql2+";"+sql3, [id, id, id, id], (err, response) => {
		if (err) throw err
		res.redirect(req.get('referer'));
	})
}