import { Router } from 'express';
import rpcTaskController from '../controllers/rpc-tasks.controller.js';
import { wrapAsyncEndpoint } from '../middlewares/handleErrors.js';


const router = Router();

router.get('/reverse', wrapAsyncEndpoint(rpcTaskController.reverseText));


export default router;