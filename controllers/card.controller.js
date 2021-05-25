const con = require('../mysql');
const shortid = require('shortid');

module.exports.index = function (req, res) {
	let sql = "SELECT * FROM users WHERE id=?";
	con.query(sql, [req.signedCookies.userId], (err, response) => {
		if (err) throw err
		res.render('card/index', {
			user: response[0]
		});
	})
};

module.exports.editList = function(req, res) {
	var list_id = req.query.list_id;
	var list_name = req.query.list_name;
	var sql = 'update threet1.card set name = ? where id = ?';
	con.query(sql, [list_name, list_id], (err, response) => {
		if (err) throw err
		return;
	})
}
module.exports.editCardName = function(req, res) {
	var list_id = req.query.card_id;
	var list_name = req.query.card_name;
	var sql = 'update threet1.card set name = ? where id = ?';
	con.query(sql, [list_name, list_id], (err, response) => {
		if (err) throw err
		res.send(s = {
			"name": list_name,
			"id": list_id
		});
	})
}

module.exports.addList = function (req, res) {
	var list_id = shortid.generate();
	let sql = "INSERT into threet1.list VALUES (?, ?, ?)";
	var s = {
		"id": list_id,
		"list_name": req.query.list_name,
		"wordk_id": req.query.work_id
	}
	con.query(sql, [list_id, req.query.list_name, req.query.work_id], (err, response) => {
		if (err) throw err
		res.render('card/addList', {
			list: s
		});
	})
}
module.exports.deleteList= function(req,res){

	let id = req.params.id;
	let sql = "DELETE FROM threet1.comment_has_card WHERE card_list_id=?";
	let sql1 = "DELETE FROM threet1.card WHERE list_id=?";
	let sql2 = "DELETE FROM threet1.list WHERE id=?";
	con.query(sql+"; " +sql1+ ";"+ sql2, [id,id,id], (err, response) => {
		if (err) throw err
		res.redirect(req.get('referer'));
	})
}

module.exports.addComment = function(req, resq) {
	// console.log(req.body.comment);
	// console.log(req.body.card_id);
	var id = shortid.generate();
	let sql = "select * from card where id = ?";
	// let sql2 = "insert into comment_has_member values (?,?,?,?)"	// comment, card, list, word
	con.query(sql, [req.body.card_id], (err,res)=>{
		if (err) throw err
		let sql = "select * from users where users.id = ?";
		let sql1 = "INSERT into comment VALUES (?, ?)";
		let sql2 = "INSERT into comment_has_member values (?,?)";
		let sql3 = "insert into comment_has_card values (?,?,?,?)"	// comment, card, list, word
		con.query(sql+"; "+sql1+"; "+sql2+"; "+sql3, [req.signedCookies.userId, id, req.body.comment, id, req.signedCookies.userId, id, res[0].id, res[0].list_id, res[0].list_work_id], (err, res1) => {
			if (err) throw err
			//id + avatar + name + content
			var s = {
				"id": req.signedCookies.userId,
				"cardId":req.body.card_id,
				"avatar": res1[0][0].avatar,
				"name": res1[0][0].name,
				"comment": req.body.comment
			}
			global.socket.emit("serverSendComment",s);
			// resq.render('card/addComment', {
			// 	sa: s
			// });
		})
	})
	
}

module.exports.addCard = function (req, res) {
	// console.log(req.file.path.split('\\').slice(1).join('/'));
	// console.log(req.body.newcard);
	// console.log(req.body.description);
	// console.log(req.body.listid);
	// console.log(req.body.workid);

	var s = {
		"id": shortid.generate(),
		"name": req.body.newcard,
		"description": req.body.description,
		"deadline": null,
		"file": req.file.path.split('\\').slice(1).join('/'),
		"seenBeforeDeadline": null,
		"seenAfterDeadline": null,
		"list_id": req.body.listid,
		"list_work_id": req.body.workid
	}

	let sql = "INSERT INTO card Set ?";
	con.query(sql, s, (err, rs) => {
		if (err) throw err
		res.render('card/addCard', {
			card: s
		});
	});

}
module.exports.deleteCard= function(req,res){

	let id = req.params.id;
	let sql = "DELETE FROM threet1.comment_has_card WHERE card_id=?";
	let sql1 = "DELETE FROM threet1.card WHERE id=?";
	con.query( sql+"; "+sql1, [id,id], (err, response) => {
		if (err) throw err
		res.redirect(req.get('referer'));
	})
}

module.exports.changeBgCard= function(req,res){
	// console.log(res);
	let id = req.params.id;
	let sql = "UPDATE threet1.card SET ? WHERE id=?";
	// console.log(req);
	req.body.file = req.file.path.split('\\').slice(1).join('/');
	let data = req.body;

	console.log([data, id])

	con.query(sql, [data, id], (err, response) => {
		if (err) throw err
		res.send({
			'file': data.file,
			'id': id
		});
	})
}

module.exports.changeDescription= function(req,res){

	let id = req.body.card_id;
	let sql = "UPDATE threet1.card SET description=? WHERE id=?";
	let data = req.body.des;
	console.log(id);
	console.log(data);
	con.query(sql, [data, id], (err, response) => {
		if (err) throw err
		return;
	})
}

module.exports.changeAttachments= function(req,res){
	let id = req.params.id;
	let sql = "UPDATE threet1.card SET attachments=? WHERE id=?";
	req.body.filename = req.file.path.split('\\').slice(1).join('/');
	let data = req.body.filename;

	console.log(res);

	con.query(sql, [data, id], (err, response) => {
		if (err) throw err
		res.redirect(req.get('referer'));
	})
}

module.exports.addDeadline= function(req,res){
	let id = req.params.id;
	let sql = "UPDATE threet1.card SET deadline=? WHERE id=?";
	let data = req.body.date+" "+req.body.time;

	con.query(sql, [data, id], (err, response) => {
		if (err) throw err
		res.redirect(req.get('referer'));
	})
}




