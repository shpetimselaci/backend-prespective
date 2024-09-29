import { Router } from 'express';
import usersRoute from './module/users/route';
import logger from './config/logger';

const routingRegistry = (router: Router) => {
    logger.info('Registering routers...');
    router.use('/users', usersRoute);
};

export default routingRegistry;
