var express = require('express');
var multer = require('multer');
var router = express.Router();
var authMiddleware = require('../middlewares/auth.middleware');
var controller= require('../controllers/work.controller');
var upload = multer({dest: './public/uploads/'});

var router = express.Router();
router.get('/',authMiddleware.requireAuth, controller.index);
router.get('/deleteWork/:id',authMiddleware.requireAuth, controller.deleteWork);

router.post('/',
    upload.single('background'),
	authMiddleware.requireAuth,
	controller.postIndex
	);
router.post('/changeBgWork/:id',
    upload.single('changeBgWork'),
	authMiddleware.requireAuth,
	controller.changeBgWork
	);
module.exports= router;