import logger from '../../config/logger';
import { User, IUser } from './model';
import createHttpError from 'http-errors';
import { MongoError } from 'mongodb';

export enum ErrorCode {
    USER_ALREADY_EXISTS = 'u10001',
    VALIDATION_ERROR = 'u10002',
    INTERNAL_SERVER_ERROR = 'u10003',
}

export const createUser = async (user: Omit<IUser, 'created_at' | 'updated_at'>) => {
    try {
        const newUser = new User(user);
        return await newUser.save();
    } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
            throw new Error(ErrorCode.USER_ALREADY_EXISTS);
        }
        logger.error(error);
        throw error;
    }
};

export const getUsers = async (limit: number, offset: number, sort: 'asc' | 'desc') => {
    try {
        const sorting = sort === 'asc' ? -1 : 1;
        return await User.find().limit(limit).skip(offset).sort({ createdAt: sort });
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
