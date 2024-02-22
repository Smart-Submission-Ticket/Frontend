// AuthService.js
const TOKEN_KEY = 'jwtToken';

const AuthService = {
  login: () => {
    // Perform login logic here
    localStorage.setItem(TOKEN_KEY, 'your_generated_jwt_token');
  },
  logout: () => {
    // Perform logout logic here
    localStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated: () => {
    return localStorage.getItem(TOKEN_KEY) !== null;
  },
};

export default AuthService;
