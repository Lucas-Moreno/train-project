import jwt, { Secret } from 'jsonwebtoken';
import mongoose from 'mongoose';
import process from 'process';
import { NextFunction } from 'express';
import UserModel from '../models/user.models';
import { Request, Response } from '../types/types'
interface JwtPayload {
  id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let token: string = ''

    if (req.cookies) {
      token = req.cookies.jwt;
    }

    if (token === '') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const secret: Secret = process.env.JWT_SECRET!

    const decodedToken = jwt.verify(token, secret) as JwtPayload;

    const user = await UserModel.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
