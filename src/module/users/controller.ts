import { Request, Response, NextFunction } from 'express';
import * as userService from './service';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error && error.message === userService.ErrorCode.USER_ALREADY_EXISTS) {
            res.status(403);
            return res.json({ message: 'User already created' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const sorting = req.query.created as  'asc' | 'desc';

        const users = await userService.getUsers(limit, offset, sorting);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
