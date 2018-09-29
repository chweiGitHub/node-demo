var express = require('express')
var router = express.Router()
var multer = require('multer')
var fs = require('fs')

var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};

const uploadFolder = '/home/www/images/upload/';

createFolder(uploadFolder);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now())
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });

// 单文件上传
// router.post('/', upload.single('logo'), function(req, res, next){
//     res.send({ret_code: '0', file: req.file});
// });
// 多文件上传
router.post('/', upload.array('logo', 3), function(req, res, next){
    res.send({ret_code: '0', file: req.file});
});

module.exports = router
