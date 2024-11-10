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


//- Создать новую вакансию
api.post("/", function (res, req) {
	if(!req.body){
		res.status(error("00001")).json({
			id: "00001",
			text: "Haven`t data!"
		});
		return;
	}

	let vac = req.body;
	vac.specification = JSON.stringify(vac.specification);
	vac.links = JSON.stringify(vac.links);
	vac.links = JSON.stringify(vac.links);

	const sql_comm = `INSERT vacancies(id, title, specification, equired_count, urgency, salary, work_exp, links, description) VALUES (?,?,?,?,?,?,?,?,?)`;

	const sql_data = [uuidv4() , vac.title, vac.specification, vac.equired_count, vac.urgency, vac.salary, vac.work_exp, vac.links, vac.descriptions];

	pool_db.query(sql_comm , sql_data , function(err_sql , data) {
		if(err_sql) {
			res.status(error("00002")).json({
				id: "00002",
				text: "Sql error"
			});
			console.error(err_sql);
			return;	
		}

		res.status(201).json({"id": user_id}).end();
	});



});


api.post("/upload", function (res, req) {

})

//- Изменить вакансию
api.patch("/", function (res, req) {
	if(!req.body){
		res.status(error("00001")).json({
			id: "00001",
			text: "Haven`t data!"
		});
		return;
	}

	let sql_comm;
	let data;
	let sql_data = [];

	for(prop in req.body) {

	}

	sql_comm = `INSERT vacancies(${}) VALUES (${ '?,'.repeat(sql_data.length) })`;
});
//- Дописать функцию


//- Получить вакансии
api.get("/" , function (res, req) {
	if(!req.body){
		res.status(error("00001")).json({
			id: "00001",
			text: "Haven`t data!"
		});
		return;
	}

	const sql_comm = `SELECT id, title, salary, specification, locate, urgency, equired_count FROM vacancies LIMIT ${req.body.count};`;

	pool_db.query(sql_comm , sql_data , function(err_sql , data) {
		if(err_sql) {
			res.status(error("00002")).json({
				id: "00002",
				text: "Sql error"
			});
			console.error(err_sql);
			return;	
		}

		filter

		res.status(201).json(data).end();
	});
});


//- Получить информацию о вакансии 
api.get("/:id" , function (res, req) {
	if(!req.params){
		res.status(error("00001")).json({
			id: "00001",
			text: "Haven`t data!"
		});
		return;
	}

	const sql_comm = `SELECT * FROM vacancies WHERE id = ?;`;

	pool_db.query(sql_comm , [ req.params["id"] ] , function(err_sql , data) {
		if(err_sql) {
			res.status(error("00002")).json({
				id: "00002",
				text: "Sql error"
			});
			console.error(err_sql);
			return;	
		}

		res.status(201).json(data[0]).end();
	});
});

//- Получить кандидатов на вакансию
api.get("/:id", function (res, req) {
	
});

