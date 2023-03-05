import mongoose from 'mongoose';
import jwt, { Secret } from 'jsonwebtoken';
import process from 'process'
import { Request, Response } from 'express'
import UserModel from '../models/user.models'
import bcrypt from 'bcryptjs'


export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      throw new Error('Cette adresse e-mail est déjà enregistrée')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({ name, email, password: hashedPassword });

    await newUser.save();

    const newUserId = newUser._id;

    const response = { message: 'Pangolin enregistré avec succès', id: newUserId, success: true };

    res.status(201).json(response);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du Pangolin' });
  }
};

export const signin = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user || !user.isPasswordCorrect(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const secret: Secret = process.env.JWT_SECRET!

    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ email: user.email, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response) => {

  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }

  res.clearCookie('jwt');

  res.status(200).json({ message: "Vous avez été déconnecté avec succès" });
};
