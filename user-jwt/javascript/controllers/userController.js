var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = "default_secret";
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstName, lastName, imgUrl, password } = req.body;
        const user = yield userService.createUser(username, firstName, lastName, imgUrl, password);
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userService.authenticateUser(username, password);
        if (user) {
            const token = jwt.sign({ id: user.id, username: user.userName }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
});
export const getUserByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserByToken(req.user.id);
        if (user) {
            res.json({ user: user });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
