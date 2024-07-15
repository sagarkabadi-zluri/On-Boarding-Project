const express = require("express");
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const db = require('../utils/db');
const { Readable } = require('stream');
const { uploadExpenses } = require("../controllers/uploadController");



const upload = multer();
router.post('/', upload.single('file'), uploadExpenses);

module.exports = router;
