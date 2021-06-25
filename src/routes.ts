import { Router } from 'express';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import ensureAdmin from './middlewares/ensureAdmin';
import AuthenticateUserController from './controllers/AuthenticateUserController';
import CreateComplimentController from './controllers/CreateComplementsController';

const routes = Router();

const authenticateUserController = new AuthenticateUserController();
const createTagController = new CreateTagController();
const createUserController = new CreateUserController();
const createComplimentController = new CreateComplimentController();

routes.use(ensureAdmin);
routes.post('/users', ensureAdmin, createUserController.handle);
routes.post('/tags', createTagController.handle);
routes.post('/login', authenticateUserController.handle);
routes.post('/compliments', createComplimentController.handle);

export default routes;
