
import express from 'express'
import getUsers, { userLoginHandler } from '../controllers/userController.js'
import userLogin from '../controllers/userController.js'


const router = express.Router();

//router.post("/", getCustomersHandler);
router.post("/login", userLoginHandler);


export default router;