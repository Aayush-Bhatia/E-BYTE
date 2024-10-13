import express from 'express';
import { postScanWaste } from '../controller/user.controller.js';
import upload from "../utils/multer.util.js";
import { verifyjwt } from '../middlewares/verifyJWT.middleware.js';


const router = express.Router();
router.get('/scanwaste',verifyjwt,upload.array("images"),postScanWaste);

export default router;


