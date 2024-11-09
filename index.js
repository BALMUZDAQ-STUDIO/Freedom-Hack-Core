const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const http_proxy = require('http-proxy');
var cookie_parser = require('cookie-parser');

const config = require('./config');

console.log(config)

const app = express();
// const proxy = http_roxy.createProxyServer({});


//- Test log func
app.use(function(req , res , next){
	let date = new Date();
	console.log(`${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}\t\t${req.ip}\t${req.method}\t${req.url}`);
	console.log(req.cookies);
	next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookie_parser())


const api = express.Router();
const api_v1 = express.Router();

const users = require('./modules/users');
// const vacancies = require('./modules/vacancies');
// const employees = require('./modules/employees');


api_v1.use("users/" , users.api.v1);
// api_v1.use("vacancies/" , vacancies.api.v1);
// api_v1.use("employees/" , employees.api.v1);


api.user("v1/" , api_v1);
app.use("api/", api);

app.listen(config.servers.api.port , config.servers.api.ip);