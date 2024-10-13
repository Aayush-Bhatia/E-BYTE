import express from 'express';
import { verifyjwtWorker } from '../middlewares/verifyJWT.middleware.js';
import { getTasks } from '../controller/worker.controller.js';
const router = express.Router();

router.post('/getTask',verifyjwtWorker,getTasks);



export default router;