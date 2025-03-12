import express from 'express'
import { getCalls, getSomeCalls,  getEvents, getFatEvents } from '../controllers/eventController.js'



const router = express.Router();


router.get("/", getCalls);
router.get("/some", getSomeCalls);
router.get("/GetEvents_OLD", getEvents);
router.get("/GetEvents", getFatEvents);

export default router;