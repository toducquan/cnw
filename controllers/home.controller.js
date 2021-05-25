const con= require('../mysql');

module.exports.index=function(req,res){
		let sql = "SELECT * FROM users WHERE id=?";
		let sql1 = 'SELECT threet1.work.* FROM threet1.work, users, team, team_has_member where team_has_member.team_id = threet1.work.team_id and team_has_member.member_id = users.id and threet1.work.team_id = team.id and users.id = ?';
		let sql2 = "select distinct  team.name FROM threet1.work, threet1.team, team_has_member, users WHERE users.id=? and threet1.work.team_id = threet1.team.id and team_has_member.team_id = threet1.team.id and users.id = team_has_member.member_id"
	con.query(sql+"; "+sql1 + ";" + sql2, [req.signedCookies.userId,req.signedCookies.userId, req.signedCookies.userId] , (err, response) => {
		if (err) throw err
		res.render('home/index',{
			user: response[0][0],
			works: response[1],
			teams: response[2]
		});
	})
};