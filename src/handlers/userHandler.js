const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../users.json');

const loadUsers = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

const registerUser = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    return h.response({ message: 'Email and password are required' }).code(400);
  }

  const users = loadUsers();
  const existing = users.find(u => u.email === email);
  if (existing) {
    return h.response({ message: 'Email already registered' }).code(409);
  }

  const newUser = { id: Date.now(), email, password };
  users.push(newUser);
  saveUsers(users);

  return h.response({ message: 'User registered successfully', user: newUser }).code(201);
};

const loginUser = async (request, h) => {
  const { email, password } = request.payload;

  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return h.response({ message: 'Invalid email or password' }).code(401);
  }

  return h.response({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
    },
  });
};

module.exports = { registerUser, loginUser };
