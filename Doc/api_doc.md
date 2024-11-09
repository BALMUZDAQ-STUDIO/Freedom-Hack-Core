# API V1

API к ядру CAS

## Пользователи

### Создание пользователя

**Метод:** `POST`   
**URL:** `/api/v1/users/`

**Описание**: Создает пользователя в базе данных.

**Тело**: JSON format
```json
{
	"login": "user_login",
	"password": "user_password",
	"name": "user_name"
}
```

**Ответ**: JSON format
```json
{
	"id": "user_id_in_db"
}
```


### Авторизация пользователя

**Метод:** `POST`   
**URL:** `/api/v1/users/sessions`

**Описание**: Запрос сохранят cookies с токеном авторизации. Куки сохраняется с названием `token`

**Тело**: JSON format
```json
{
	"login": "user_login",
	"password": "user_password"
}
```

**Ответ**: JSON format
```json
{
	"token": "user_session_token"
}
```


### Удаление пользователя

**Метод:** `POST`   
**URL:** `/api/v1/users/:id`

**Описание**: Запрос сохранят cookies с токеном авторизации. Куки сохраняется с названием `token`

**Тело**: JSON format
```json
{
	"password": "user_password"
}
```

**Ответ**: JSON format
```json
{
	"status": "user_session_token"
}
```


### Изменение пользователя

**Метод:** `POST`   
**URL:** `/api/v1/users/:id`

**Описание**: Запрос сохранят cookies с токеном авторизации. Куки сохраняется с названием `token`

**Тело**: JSON format
```json
{
	"login": "user_login",
	"password": "user_password"
}
```

**Ответ**: JSON format
```json
{
	"token": "user_session_token"
}
```


### Изменение пользователя (авторизованого)

**Метод:** `POST`   
**URL:** `/api/v1/users/@me`

**Описание**: Запрос сохранят cookies с токеном авторизации. Куки сохраняется с названием `token`

**Тело**: JSON format
```json
{
	"login": "user_login",
	"password": "user_password"
}
```

**Ответ**: JSON format
```json
{
	"token": "user_session_token"
}
```


## Вакансии 

### Создание вакансии

**Метод:** `POST`   
**URL:** `/api/v1/users/`

**Описание**: Создает пользователя в базе данных.

**Тело**: JSON format
```json
{
	"login": "user_login",
	"password": "user_password",
	"name": "user_name"
}
```

**Ответ**: JSON format
```json
{
	"id": "user_id_in_db"
}
```


### Реадкитрование вакансии

**Метод:** `POST`   
**URL:** `/api/v1/users/`

**Описание**: Создает пользователя в базе данных.

**Тело**: JSON format
```json
{
	"login": "user_login",
	"password": "user_password",
	"name": "user_name"
}
```

**Ответ**: JSON format
```json
{
	"id": "user_id_in_db"
}
```


### Закрытие вакансии

**Метод:** `POST`   
**URL:** `/api/v1/users/`

**Описание**: Создает пользователя в базе данных.

**Тело**: JSON format
```json
{
	"login": "user_login",
	"password": "user_password",
	"name": "user_name"
}
```

**Ответ**: JSON format
```json
{
	"id": "user_id_in_db"
}
```