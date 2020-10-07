import axios from 'axios';
import User from '../interfaces/User';

class AuthService {
  user: User;

  authenticated: boolean;

  constructor() {
    this.user = {
      username: '',
    };
    this.authenticated = false;
  }

  async authenticate(username: string, password: string, action: string): Promise<any> {
    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:3000/api/auth/${action}`,
        data: {
          username,
          password,
        },
      });
      document.cookie = `token=${response.data.token}`;
      this.user.username = username;
      this.authenticated = true;
    } catch (error) {
      throw new Error(error.message || `Error with sending ${action} request`);
    }
  }

  logOut() {
    document.cookie = 'token=';
    this.authenticated = false;
  }

  getUsername(): string {
    return this.user.username;
  }

  getIsAuthenticated(): boolean {
    const hasToken = this.getHasTokenCookie();
    console.log(this.authenticated, hasToken);
    return this.authenticated || hasToken;
  }

  getHasTokenCookie(): boolean {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const values = cookies[i].split('=');
      if (values[0].trim() === 'token' && values[1]) return true;
    }
    return false;
  }
}

const authService = new AuthService();
export default authService;
