import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import cryptoRouter from './cryto.routes';

const routes = Router();

routes.use('/api/login', sessionsRouter);
routes.use('/api/cryto', cryptoRouter);

export default routes;
