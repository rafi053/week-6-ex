import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import dotenv from "dotenv"

dotenv.config();

const JWT_SECRET:string = "default_secret";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, firstName, lastName, imgUrl,  password } = req.body;
    const user: User = await userService.createUser(userName, firstName, lastName, imgUrl, password);
    res.json({  user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
 }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await userService.authenticateUser(username, password);
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.userName }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};


export const getUserByToken = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
   const user: User | null = await userService.getUserByToken(req.user.id);
   if (user) {
     res.json({ user: user });
   } else {
     res.status(404).json({ message: 'User not found' });
   }     
  } catch (error) {
    next(error);
  }
};

