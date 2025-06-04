const BASE_URL = 'http://localhost:5000';

const AuthService = {
  async login({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  async register({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      if (!response.ok) {
        throw new Error(data.message || 'Register failed');
      }
      return data;
    } catch (err) {
      throw new Error(`Unexpected response: ${text}`);
    }
  },
};

export default AuthService;