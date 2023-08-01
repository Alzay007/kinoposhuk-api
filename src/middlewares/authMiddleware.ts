import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { User, getUserFromToken } from './userUtils';

export interface AuthenticatedRequest extends ExpressRequest {
  user?: User;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  try {
    const user = getUserFromToken(token);

    if (!user) {
      return res.status(401).json({ error: 'Неверный токен' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Неверный токен' });
  }
};
