import express from 'express';
import cors from 'cors';
import moviesRoutes from './routes/movieRoutes';

export function createServer() {
  const app = express();

  app.use(express.static('./src'));

  app.use(cors());
  app.use(express.json());

  app.use('/movies', moviesRoutes);


  app.get('/', (req, res) => {
    res.send('Hi');
  });

  return app;
}