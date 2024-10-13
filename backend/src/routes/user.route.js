import express from 'express';
import { postScanWaste } from '../controller/user.controller.js';
import upload from "../utils/multer.util.js";
import { verifyjwt,postupdateProfile, updateFeedback, getUser } from '../middlewares/verifyJWT.middleware.js';


const router = express.Router();
router.post('/scanwaste',verifyjwt,upload.array("images"),postScanWaste);
router.post('/updateProfile',verifyjwt,upload.single("image"),postupdateProfile);
router.post('/feedback',verifyjwt,updateFeedback);
router.post('/getUser',verifyjwt,getUser);





export default router;


