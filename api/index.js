
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getAllGenres } = require('./src/controllers/genreControl')
require('dotenv').config();
const {
  PORT
} = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    getAllGenres()
  });
});
