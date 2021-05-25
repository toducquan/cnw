var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth.middleware');
var controller= require('../controllers/home.controller');

var router = express.Router();
router.get('/', authMiddleware.requireWelcome, controller.index);

module.exports= router;