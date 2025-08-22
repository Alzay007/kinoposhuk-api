import express, { Request, Response } from 'express';
import Movie from '../models/movie';
import { MovieFilter } from '../types/interfaces';
import db from '../db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    const genre = req.query.genre as string;

    const filter: MovieFilter = {};
    if (genre) filter.genre = genre;

    const movies = await db.collection('movies')
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray();

    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении списка фильмов' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Фильм не найден' });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении информации о фильме' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newMovieData = req.body;

    const newMovie = new Movie(newMovieData);
    const savedMovie = await newMovie.save();

    res.json(savedMovie);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при добавлении нового фильма' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }

    await movie.deleteOne();

    return res.json({ message: 'Фильм успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const updatedMovieData = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedMovieData, { new: true });

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Фильм не найден' });
    }

    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении информации о фильме' });
  }
});


export default router;
