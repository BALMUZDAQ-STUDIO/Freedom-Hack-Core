module.exports = function (res, id, text) {
	let http_code;

	switch(id){
		case "00001": 	// Client didn`t provide the data 
			http_code = 400;
			break;
		case "00002": 	// SQL server error
			http_code = 500;
			break;
		case "00003": 	// Client provide incorrect data
			http_code = 500;
			break;
		default: 
			http_code = 500;
	}

	res.status().json({ "error": { "code": id, "text": text } }).end();
}