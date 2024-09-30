import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routingRegistry from './routing-registry';
import router from './route';
import { zodParseErrorMiddleware } from './middlewares/zod-parse-error';
import logger from './config/logger';
import connectDB from './db/connection';
import { notFoundMiddleware } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';

const startServer = async (config: { apiVersion: string; port: number; dbUrl: string }) => {
    const app: Express = express();

    app.use(express.json());
    app.use(cors()).use(express.json()).options('*', cors());

    app.use(
        morgan(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
        ),
    );
    await connectDB(config.dbUrl);
    routingRegistry(router);
    app.use(`/${config.apiVersion}`, router);
    app.use(zodParseErrorMiddleware);
    app.use(notFoundMiddleware);
    app.use(errorHandler);
    return app.listen(config.port, () => {
        logger.info(`[server]: Server is running at http://localhost:${config.port}`);
    });
};

export default startServer;
