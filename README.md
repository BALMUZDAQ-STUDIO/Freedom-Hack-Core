![Logo](https://raw.githubusercontent.com/BALMUSDAQ-STUDIO/Balmuzdaq-logos/refs/heads/main/Balmuz_logo_1.png)


<h1 align="center">CAS <i>Backend</i></h1>

**CAS (Candidate Archiving System) Backend** is 2 server: 

- **Core-server**: Server, where the entire API and the main functionality of the platform are implemented
- **Web-server**: Server for delivering site pages and implementing routing of SPA pages 

## Tech Stack

- **JavaScript**: Main programming language used to develop the server.
 	- **ExpressJS**: this is a JS framework for programming web applications.
- **MySQL**: Fast DataBase for store all data.
- **GeminiAI API**: Uses the power of AI to search and select candidates, as well as their indexing.
- **HH.kz API**: It is used for convenient synchronization of workspaces

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/BALMUSDAQ-STUDIO/Dec-hack.git
    cd Dec-hack
    ```

2. Install required dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables:
    - Open a `config/config.json` file with the following variables:
        - `servers`: 
        	- `api`:
        		- `ip`:
        		- `port`:
        	- `web`:
        		- `ip`:
        		- `port`:	

    Example:
    ```env
    {
		"servers": {
			"api": {
				"ip": "0.0.0.0",
				"port": "3000",
				"subdomain": "api"
			},
			"web": {
				"ip": "0.0.0.0",
				"port": "4000",
				"subdomain": "api"
			}
		}
	}
    ```

4. Run the server:

    ```bash
    npm run start
    ```

    After this code

## Key Files

- `index.js`: The file were asseblity API.
- `modules/courses/index.js`: API for courses.
- `modules/users/index.js`: API for users.
- `modules/chatbots/index.js`: API for chatbots.


## Authors

- [@DeadSmileCode](https://www.github.com/DeadSmileCode)
- [@RuslanAmirov](https://github.com/tengri)


## Feedback

If you have any feedback, please reach out to us at balmuzdaq.studio@gmail.com


## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.