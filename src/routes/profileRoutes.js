const path = require('path');
const fs = require('fs');
const users = require('../users.json');

const uploadProfilePicture = {
  method: 'POST',
  path: '/profile/upload',
  options: {
    payload: {
      output: 'stream',
      parse: true,
      multipart: true,
      maxBytes: 2 * 1024 * 1024,
      allow: 'multipart/form-data',
    }
  },
  handler: async (request, h) => {
    const { userId } = request.payload;
    const file = request.payload.image;

    if (!file || !userId) return h.response({ message: 'Missing data' }).code(400);

    const filename = `${Date.now()}-${file.hapi.filename}`;
    const savePath = path.join(__dirname, '..', 'uploads', filename);

    const fileStream = fs.createWriteStream(savePath);
    await file.pipe(fileStream);

    const user = users.find(u => u.id === parseInt(userId));
    if (user) user.profilePicture = `/uploads/${filename}`;
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    return h.response({ imageUrl: `/uploads/${filename}` }).code(200);
  }
};

module.exports = [uploadProfilePicture];
