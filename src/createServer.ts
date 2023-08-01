import express from 'express';
import cors from 'cors';
import userAuthRoutes from './routes/userAuthRoutes';
import userProfileRoutes from './routes/userProfileRoutes';
import moviesRoutes from './routes/movieRoutes';

export function createServer() {
  const app = express();

  app.use(express.static('./src'));

  app.use(cors());
  app.use(express.json());

  app.use('/auth', userAuthRoutes)
  app.use('/user', userProfileRoutes);
  app.use('/movies', moviesRoutes);


  app.get('/', (req, res) => {
    res.send('Hi');
  });

  return app;
}