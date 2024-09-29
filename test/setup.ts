import { MongoMemoryServer } from 'mongodb-memory-server';
import startServer from '../src/server';

export const setupTestApp = async (port?: number) => {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    const app = await startServer({ apiVersion: '/v1', port: port || 200, dbUrl: uri });

    return { app, mongod };
};
