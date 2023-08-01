import express, { Request, Response } from 'express';
import User from '../models/user';
import { authMiddleware, AuthenticatedRequest } from '../middlewares/authMiddleware';
import Movie from '../models/movie';

const router = express.Router();

router.post('/watched/:movieId', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user;
    const movieId = req.params.movieId;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const watchedMovie = user.ratedMovies.find(movie => movie._id === movieId);

    if (!watchedMovie) {
      const movieToAdd = await Movie.findById(movieId).select('-siteRating');

      if (!movieToAdd) {
        return res.status(404).json({ error: 'Фильм не найден' });
      }

      user.ratedMovies.push(Object.assign({}, movieToAdd.toObject(), { siteRating: 0 }));
    }

    user = await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.post('/watchlist/:movieId', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user;
    const movieId = req.params.movieId;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
    }

    user = await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.post('/rate/:movieId', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user;
    const movieId = req.params.movieId;
    const rating = req.body.rating;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const movieToUpdate = user.ratedMovies.find((movie) => movie._id === movieId);

    if (!movieToUpdate) {
      return res.status(404).json({ error: 'Фильм не найден в списке оцененных' });
    }

    movieToUpdate.siteRating = rating;

    user = await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


