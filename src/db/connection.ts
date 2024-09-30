import mongoose from 'mongoose';
import logger from '../config/logger';

const connectDB = async (dbUrl: string) => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        logger.error(error);
        throw new Error('Cannot connect to MongoDB');
    }
};

export default connectDB;
