const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GoogleAIFileManager } =  require('@google/generative-ai/server');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const libre = require('libreoffice-convert');


// let lib_convert = promisify(libre.convert);

const config = require('../../config');

const genAI = new GoogleGenerativeAI(config.secrets.ai_token);
const fileManager = new GoogleAIFileManager(config.secrets.ai_token);


async function convert(file_name) {
	try {
		const enterPath = path.join(__dirname, `/uploads/${file_name}`);
		const outputPath = path.join(__dirname, `/uploads/${file_name}`);

		let data = await fs.readFile(enterPath)

		let done = await lib_convert(data, '.pdf', undefined)

		await fs.writeFile(outputPath, done)

		return { success: true, file_name: file_name };
	} catch (err) {
		console.log(err)
		return { success: false }
	}
}

module.exports.convert_file = convert;


async function analys_cv(file_data) {
	let upload_cv = await fileManager.uploadFile(
		path.join(__dirname, `../../uploads/${file_data}`),
		{
			mimeType: "application/pdf",
			displayName: "Book",
		}
	);

	console.log(`Uploaded file ${upload_cv.file.displayName} as: ${upload_cv.file.uri}`);

	const model = genAI.getGenerativeModel({ "model": "gemini-1.5-flash"});

	const chat = model.startChat({
		history: []
	});

	let result = await chat.sendMessage([ 
		{
			fileData: {
				mimeType: upload_cv.file.mimeType,
				fileUri: upload_cv.file.uri,
			}
		} , `Проанализируй этот файл и выдай мне мне в json формате основные данные такие как: имя, фамилия, гендер(f - жещина или m - мужчина), образование, место проживания, может и хочет ли она переезжать(0 - не хочет или не может переезжать, 1 - может переехать, но не хотелось бы, 2 - готова к перездам), дата рождения, телефоный номер, почту, опыт работы(в годах), относительную оценку как сотрудника по 100 бальной системе, скилы(5-6 штук, короткие, записывать в skills), языки которыми владеет и массив со строками где будет краткие тезисы его как сотрудника(должны быть как и hard skills, так и soft skils, не менее 30 тезисов) для будущей индексации и подбора вакансии для него. Если в резюме отсутсвуют какие-то данные пиши их как "none". Пример json:
{
"name" : "имя",
"surname": "фамилия",
"gender": "m",
"email": "электроная почта",
"phone": "номер телефона",
"education": "данные"
"locate": "место проживания",
"relocate": 0,
"birthday": "dd.mm.yyyy",
"experience": 0,
"level": 0,
"skills": ["данные", "данные"],
"languages": ["данные", "данные"],
"index": ["данные" , "данные"]
}` ]);

	result = (result.response.text()).replace(/```json\s*|\s*```/g, '');

	await fileManager.deleteFile(upload_cv.file.name);

	result.id = file_data.name;

	console.log(result);

	return JSON.parse(result);
}


module.exports.analys_cv = analys_cv;