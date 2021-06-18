const axios = require('axios').default;

export default class AuthService {
	constructor() {
		this.username = '';
		this.isLoggedIn = false;
	}

	getIsLoggedIn() {
		if (this.isLoggedIn) {
			return true;
		} else {
			const token = window.localStorage.getItem('token');
			if (token) {
				this.setCredentials(window.localStorage.getItem('username'), token);
				return true;
			}
			return false;
		}
	}

	getUsername() {
		return this.username;
	}

	async login(username, password) {
		const token = window.localStorage.getItem('token');
		console.log(username);
		if (token) {
			this.setCredentials(username, token);
			return true;
		} else {
			try {
				const response = await axios.post(
					'http://localhost:3000/api/auth/login',
					{
						username: username,
						password: password
					}
				);
				const token = response.data.token;
				this.setCredentials(username, token);
				return true;
			} catch (error) {
				console.log('ERROR');
				console.log(error);
			}
		}
	}

	async register(username, password) {
		const response = await axios.post('http://localhost:3000/api/auth/signup', {
			username,
			password
		});
		const token = response.data.token;
		this.setCredentials(username, token);
		return true;
	}

	setCredentials(username, token) {
		window.localStorage.setItem('token', token);
		window.localStorage.setItem('username', username);
		this.isLoggedIn = true;
		this.username = username;
	}
}
