var mysql_helper = require('./mysql_helper');
const bcrypt = require('bcrypt');

function registerUserHandler(req, res) {
	var dob = req.body.dob.split('T')[0];
	const query = "INSERT INTO user (name, email, password, is_admin, dob, mobile, country, zipcode) VALUES ?";
	bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
		const values = [[[req.body.name, req.body.email, hashedPass, false, dob, req.body.mobile, req.body.country, req.body.zipcode]]];
		mysql_helper.executeQuery(query, values).then((result) => {
			res.send("Success");
		});
	});
}

async function registerGameCall(req, res){
	const query = "SELECT * FROM games_enum";
	mysql_helper.executeQuery(query, []).then((result) => {
			res.send(result);
		});
}

async function registerSkillCall(req, res){
	const query = "SELECT * FROM skill_level_enum";
	mysql_helper.executeQuery(query, []).then((result) => {
			res.send(result);
		});
}

async function registerGameHandler(req, res){
	
	size = game_id.length;
	for (var i =0; i < size; i++){
	const query = "INSERT INTO user_skills(user_id, game_id, skill_id) VALUES ?";
	const values = [[[req.body.user_id, req.body.game_id, req.body.skill_id]]];
	mysql_helper.executeQuery(query, values).then((result) => {
			res.send("done");
	});
	}
	
}

function loginHandler(username, password, done) {
	if(username == "test@test.com" && password == "test")
		return done(null, {username: "test"})
	return done(null, false, { message: 'Incorrect username or password.' });
}

function serializeUser(user, done) {
	done(null, 1)
}

function deserializeUser(id, done) {
	done(null, {username: "test"})
}

function logoutHandler(req, res) {
	req.logout();
	res.send("Success");
}

module.exports = {
	loginHandler: loginHandler,
	registerUserHandler: registerUserHandler,
	registerGameHandler: registerGameHandler,
	registerGameCall: registerGameCall,
	registerSkillCall: registerSkillCall,
	logoutHandler: logoutHandler,
	serializeUser: serializeUser,
	deserializeUser: deserializeUser
}
