import express from 'express'
import {   getEvents, getFatEvents } from '../controllers/eventController.js'
import  { authenticateUser }  from '../config/authMiddleware.js';




const router = express.Router();


//router.get("/", getCalls);
//router.get("/some", getSomeCalls);
router.get("/GetEvents_OLD", getEvents);
//router.get("/GetEvents",  getFatEvents );
router.get("/GetEvents", authenticateUser, getFatEvents );

export default router;