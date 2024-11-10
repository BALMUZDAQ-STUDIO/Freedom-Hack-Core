const http = require('http');
const fs = require('fs');
const FormData = require('form-data');

// Файл, который нужно отправить
// const filePath = './123.pdf';
const filePath2 = './1234.zip';


// Создаём форму и добавляем в нее файл
const form = new FormData();
// form.append('files', fs.createReadStream(filePath));
form.append('files', fs.createReadStream(filePath2));


// Опции для запроса
const options = {
  method: 'POST',
  host: 'localhost', // Замените на адрес вашего сервера
  port: 3000,        // Замените на порт вашего сервера
  path: '/api/v1/employees/cvs/upload',   // Путь на сервере для обработки загрузки
  headers: form.getHeaders(),
};

// Создаем запрос и отправляем данные формы
const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Ответ сервера:', data);
  });
});

req.on('error', (error) => {
  console.error('Ошибка запроса:', error);
});

// Отправляем данные формы
form.pipe(req);


