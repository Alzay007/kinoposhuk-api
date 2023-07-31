import mongoose, { ConnectOptions } from "mongoose";

const dbURI = 'mongodb://localhost:27017/my_movie_db';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
} as ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к базе данных:'));
db.once('open', () => {
  console.log('Успешное подключение к базе данных');
});

export default db;
