import express from 'express'
import { getCalls, getSomeCalls,  getEvents, getFatEvents } from '../controllers/eventController'
import  { authenticateUser }  from '../config/authMiddleware';




const router = express.Router();


router.get("/", getCalls);
router.get("/some", getSomeCalls);
router.get("/GetEvents_OLD", getEvents);
router.get("/GetEvents", authenticateUser, getFatEvents );

export default router;