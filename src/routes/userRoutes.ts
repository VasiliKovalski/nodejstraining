
import express from 'express'
import getUsers from '../controllers/eventController.js'


const router = express.Router();

router.get("/", getUsers);


export default router;