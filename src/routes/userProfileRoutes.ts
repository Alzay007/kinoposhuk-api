import express, { Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { authMiddleware, AuthenticatedRequest } from '../middlewares/authMiddleware';
import { ObjectId } from 'mongodb';
import db from '../db';

const router = express.Router();

router.get('/profile', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.put('/profile', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    const { username, email, password, avatar } = req.body;

    const userIdObject = new ObjectId(userId);

    let user = await db.collection('users').findOne({ _id: userIdObject });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (avatar) user.avatar = avatar;

    await db.collection('users').updateOne({ _id: userIdObject }, { $set: user });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;
