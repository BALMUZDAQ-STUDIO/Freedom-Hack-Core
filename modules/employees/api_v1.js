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

