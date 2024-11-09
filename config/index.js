//- Non secret config
const ns_config = require('./config.json');

const master_config = ns_config;

master_config.secrets = {
		ai_token: process.env["AI_TOKEN"],
		hh_token: process.env["HH_TOKEN"],	
		auth_secret: process.env["AUTH_SECRET"],
		db_login: process.env["DB_LOGIN"],
		db_password: process.env["DB_PASSWORD"],
	};

module.exports = master_config;