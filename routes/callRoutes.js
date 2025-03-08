const express = require("express");

const { getCalls, getSomeCalls,  getEvents, getFatEvents } = require("../controllers/callController");

const router = express.Router();


router.get("/", getCalls);
router.get("/some", getSomeCalls);
router.get("/GetEvents_OLD", getEvents);
router.get("/GetEvents", getFatEvents);

module.exports = router;