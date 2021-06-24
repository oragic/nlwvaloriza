import { Router } from 'express';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import ensureAdmin from './middlewares/ensureAdmin';

const routes = Router();

const createTagController = new CreateTagController();
const createUserController = new CreateUserController();

routes.use(ensureAdmin);
routes.post('/users', ensureAdmin, createUserController.handle);
routes.post('/tags', createTagController.handle);

export default routes;
