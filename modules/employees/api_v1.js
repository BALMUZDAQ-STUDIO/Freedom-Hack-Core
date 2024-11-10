const express = require("express");
const mysql = require("mysql2");
const { v4: uuidv4 } = require('uuid');
const multer  = require("multer");
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const decompress = require('decompress');
var Magic = require('mmmagic').Magic;

const config = require('../../config');

const error = require('../error');
const ai = require('./ai');


const api = express.Router();
var magic = new Magic();


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4());
	}
});

const uploader = multer({ storage: storage });



const pool_db =  mysql.createPool({
	connectionLimit: 1000,
	host: config.db.host,
	user: config.secrets.db_login,
	database: config.db.db,
	password: config.secrets.db_password
});
pool_db.config.namedPlaceholders = true;



api.post("/cvs/upload", uploader.array('files', 1000), async function (req , res) {
	if(!req.files || req.files.length === 0){
		res.status(error("00001")).json({
			id: "00001",
			text: "Haven`t data!"
		});
		return;
	}

	let files_id = [];

	for(file of req.files){

		console.log(file);



		if(file.mimetype === "application/zip"){
			let unzip_files = await decompress( path.join(__dirname, `../../uploads/${file.filename}`) , './uploads', {
				"map": file => {
					file.path = uuidv4();
					files_id.push(file.path);

					magic.detectFile(path.join(__dirname, `../../uploads/${file.path}`) , function (err, result) {
						if(file.mimetype === "application/msword") {
							ai.convert_file(file.path);
						}
						else if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
							ai.convert_file(file.path);
						}

						return file;
					});
				}
			});
		}
		else if(file.mimetype === "application/msword") {
			ai.convert_file(file.filename);
			files_id.push(file.filename);
		}
		else if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
			console.log("TEEEEEEEEEEEEEEEEEEE");

			ai.convert_file(file.filename);
			files_id.push(file.filename);
		}
		else {
			files_id.push(file.filename);
		}

	}

	res.status(201).json({ files_id: files_id }).end();
});


api.post("/cvs/", function (req , res) {
	if(!req.body){
		res.status(error("00001")).json({
			id: "00001",
			text: "Haven`t data!"
		});
		return;
	}


	function add_data_in_db(candidate) {
		const sql_comm = `INSERT employees(id, name, surname, email, phone, gender, education, locate, relocate, cv, \`index\`, experience, level, skills, languages, birthday,age) 
							VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

		candidate.id = "123456789"
		candidate.name = "asd";
		candidate.surname = "asd";
		candidate.email = "asd@gmail.com";
		candidate.skills = JSON.stringify(candidate.skills);
		candidate.index = JSON.stringify(candidate.index);
		candidate.languages = JSON.stringify(candidate.languages);


		console.log(candidate);

		console.log(candidate.surname)

		let arr_cand = [candidate.id, 
		candidate.name, 
		candidate.surname, 
		candidate.email, 
		candidate.phone,
		candidate.gender, 
		candidate.education, 
		candidate.locate, 
		candidate.relocate, 
		candidate.cv || "", 
		candidate.index, 
		candidate.experience, 
		candidate.level, 
		candidate.skills, 
		candidate.languages, 
		candidate.birthday,
		candidate.age];

		console.log(arr_cand);

		pool_db.query(sql_comm , arr_cand , function(err_sql , data) {
			if(err_sql) {
				console.error(err_sql);
				return;	
			}
		});
	}

	console.log(req.body.files_id);


	for(file_id of req.body.files_id){
		ai.analys_cv(file_id)
		.then(add_data_in_db)
	}

	res.status(200).json({"status": "start"}).end();
});

module.exports = api;