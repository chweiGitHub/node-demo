/*
  商品列表的获取
  1. mongodb的连接、监听
  2. 列表数据的查询、筛选、排序
*/

var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var Product = require('../models/product');

// 连接数据库
mongoose.connect('mongodb://192.168.1.166:27017/note');

// 监听数据库的连接情况
mongoose.connection.on('connected', ()=>{
  console.log('mongodb connected.');
});
mongoose.connection.on('error', ()=>{
  console.log('mongodb error.');
});
mongoose.connection.on('disconnected', ()=>{
  console.log('mongodb disconnected.');
});

router.get('/', function(req, res, next) {
  console.log('aa00');
  console.log(req.params);
  console.log(JSON.stringify(req.query));
  // req.param('') 这种方式在4.x版本被淘汰
  // let page = parseInt(req.param('page'));
  // let pageSize = parseInt(req.param('pageSize'));
  // let sort = req.param('sort');
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = parseInt(req.query.sort);
  let skip = (page - 1) * pageSize;
  let params = {};

  // 价格区间的过滤
  let priceLevel = req.query.priceLevel;
  let prictGt = 0, priceLte = 0;
  if(priceLevel!='all'){
    switch(priceLevel){
      case '0': prictGt =0; priceLte = 2000;break;
      case '1': prictGt =2000; priceLte = 3000;break;
      case '2': prictGt =3000; priceLte = 4000;break;
      case '3': prictGt =4000; priceLte = 10000;break;
    }
    params = {
      price: {
        $gt: prictGt,
        $lte: priceLte
      }
    }
  }

  console.log('page: '+page+"--pageSize: "+pageSize+"--sort: "+sort+"--skip: "+skip);

  let goodsModel = Product.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'price': sort});
  // 带参数的查询可以用exec
  goodsModel.exec((err, doc)=> {
    console.log('--------');
    console.log(err);
    console.log('=========');
    console.log(doc);
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });

  // 单纯的查询数据可以直接用find
  // Product.find({}, (err, doc)=> {
  //   if(err){
  //     res.json({
  //       status: '1',
  //       msg: err.message
  //     });
  //   } else {
  //     res.json({
  //       status: '0',
  //       msg: '',
  //       result: {
  //         count: doc.length,
  //         list: doc
  //       }
  //     });
  //   }
  // });
});

module.exports = router;
