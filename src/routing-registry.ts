import { Router } from 'express';
import logger from './config/logger';

const routingRegistry = (router: Router) => {
    logger.info('Registering routers...');
};

export default routingRegistry;
