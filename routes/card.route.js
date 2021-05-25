var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth.middleware');
var controller= require('../controllers/card.controller');
var multer = require('multer');
var upload = multer({dest: './public/uploads/'});
router.get('/',authMiddleware.requireAuth, controller.index);


router.get('/addList',authMiddleware.requireAuth, controller.addList)
router.get('/deleteList/:id',authMiddleware.requireAuth, controller.deleteList)
router.get('/editList', controller.editList)
router.get('/editCardName', controller.editCardName)





router.post('/addCard',upload.single('file'), authMiddleware.requireAuth, controller.addCard);
router.get('/deleteCard/:id',authMiddleware.requireAuth, controller.deleteCard)



router.post('/addComment', controller.addComment);
router.post('/changeBgCard/:id',
	upload.single('file'),
	authMiddleware.requireAuth,
	controller.changeBgCard
	);
router.post('/changeDescription/',authMiddleware.requireAuth, controller.changeDescription);
router.post('/changeAttachments/:id',
	upload.single('filename'),
	authMiddleware.requireAuth,
	controller.changeAttachments
	);
router.post('/addDeadline/:id',authMiddleware.requireAuth, controller.addDeadline);


module.exports= router;