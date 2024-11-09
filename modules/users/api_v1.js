const express = require("express");
const mysql = require("mysql2");
const { v4: uuidv4 } = require('uuid');
const multer  = require("multer");
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../../config');

const error = require('../error');


const api = express.Router();
const uploader = multer({ dest:"uploads" });

const pool_db =  mysql.createPool({
	connectionLimit: 1000,
	host: config.db.host,
	user: config.secrets.db_logins,
	database: config.db.db,
	password: config.secrets.db_password
});


function check_verification(req, res, next) {
	const token = req.headers['authorization'] || req.cookies.token;

	if (!token) {
		return res.status(403).json({ message: 'Токен не предоставлен' });
	}

	jwt.verify(token, config.secrets.auth_secret , (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Inncorrect token!' });
		}

		req.user_id = decoded.id;
		next();
	});
}

module.exports.check_verification = check_verification;


api.post("/", function (req, res) {
	if(!req.body){
		error(res, {
			id: "00001",
			text: "Haven`t data!"
		});
		return;
	}

	const sql_comm = `INSERT users(id, login, password, name) VALUES (?,?,?,?)`;

	const user_id = uuidv4();

	let sql_data = [user_id, req.body.login, '', req.body.name]

	const salt = bcrypt.genSaltSync(config.auth.rounds);
	const password_hash = bcrypt.hashSync(req.body.password, salt);

	sql_data[2] = password_hash;

	pool_creator.query(sql_comm , sql_data , function(err_sql , data) {
		if(err_sql) {
			error(res, {
				id: "00002",
				text: "Sql error"
			});
			console.error(err_sql);
			return;	
		}

		res.status(201).json({"id": user_id}).end();
	});
});


api.delete("/:id", function (req, res) {
	
});

api.patch("/:id", function (req, res) {
	
});

api.post("/sessions", function (req, res) {
	if(!("login" in req.body) || !("password" in req.body)){
		error(res, "00001", "Haven`t data");
		return;
	}

	const sql_comm = "SELECT id, password FROM users WHERE login = ?;";

	pool_creator.query(sql_comm , [ req.body.login ] , function(err_sql , data) {
		if( !bcrypt.compareSync(req.body.password, data[0].password) ) {
			error(res, "00003", "Incorrect password");
			return;
		}

		var token = jwt.sign({ id: data[0].id }, config.secrets.auth_secret);
	
		res.status(201).cookie("token", token).json({ token }).end();
	});
});
