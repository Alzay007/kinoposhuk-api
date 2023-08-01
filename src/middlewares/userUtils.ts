import jwt from 'jsonwebtoken';

export interface DecodedToken {
  userId: string;
}

export interface User extends DecodedToken {
}

export const SECRET_KEY = '7d2u2skJ$*asF6LgC3#fT$50a!';

export const getUserFromToken = (token: string): User | null => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;
    return decodedToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
