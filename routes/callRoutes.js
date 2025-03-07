const express = require("express");

const { getCalls, getSomeCalls } = require("../controllers/callController");

const router = express.Router();


router.get("/", getCalls);
router.get("/some", getSomeCalls);

module.exports = router;