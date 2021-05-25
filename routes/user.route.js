var express = require('express');
var multer = require('multer');

var controller= require('../controllers/user.controller');
var validate= require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var upload = multer({dest: './public/uploads/'});

var router = express.Router();

router.get('/',authMiddleware.requireAuth, controller.index);

router.get('/cookie', function(req,res,next){
res.cookie('user-id',12345);
res.send('Hello');
});

router.get('/create', controller.create);

router.get('/view',authMiddleware.requireAuth,controller.get);

router.get('/getchangeProfile',authMiddleware.requireAuth,controller.getchangeProfile);

router.post('/changeAvatar',
	upload.single('avatar'),
	authMiddleware.requireAuth,
	controller.changeAvatar
	);
router.post('/changeInfo',authMiddleware.requireAuth, controller.changeInfo);
router.post('/changePass',authMiddleware.requireAuth, controller.changePass);


router.post('/create',
	upload.single('avatar'),
	validate.postCreate,
	controller.postCreate
);

module.exports= router;