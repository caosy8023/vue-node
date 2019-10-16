var express = require('express');
var router = express.Router();
var db = require('../model/db')
var URL = require('url')
var multiparty = require('multiparty')
var formidable = require('formidable')
var {fs,rename} = require('fs')
var multer = require("multer")
const nodemailer = require('nodemailer')
const {normalize,resolve} = require('path')

/* 登录*/
router.post('/emailLogin',function(req,res){
    var sql = 'select * from validates'
    var connection = db.connection()
    var sqlparam = [req.body.validate,req.body.email]
    connection.query(sql,function(err,result){
      if(err){
        console.log(err)
      }else if(result){
        if(result[0].validate == req.body.validate && result[0].email == req.body.email ){
          res.json({
            code:200,
            msg:'登录成功'
          })
        }else{
          res.json({
            code:500,
            msg:'登录失败,邮箱或者验证码不正确'
          })
        }
      }
    })
    db.close(connection)
})
router.get('/email',function(req,res){
  let num = ''
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random()*10)
  }
  let transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: '1733010143@qq.com', // generated ethereal user
          pass: 'vbenrgvnufolbiic' // generated ethereal password
      }
  })
  transporter.sendMail({
    from: '"Fred Foo 👻" <1733010143@qq.com>', // sender address
    to: URL.parse(req.url,true).query.email, // list of receivers
    subject: '验证码', // Subject line
    text: `验证码为${num},3分钟有效!`, // plain text body
    // html: '<b>Hello world?</b>' // html body
  },function(err,info){
    if(err){
      console.log(err)
    }else{
      var sql = 'update validates set validate = ?,email = ?'
      var connection = db.connection()
      var sqlparam = [num,URL.parse(req.url,true).query.email]
      connection.query(sql,sqlparam,function(err,result){
        if(err){
          res.json({
            code:500
          })
        }else if(result){
          res.json({
            code:200
          })
        }
      })
      db.close(connection)
    }
  })
  
})
router.post('/login',function(req,res){
  var params = URL.parse(req.url, true).query;
  var sql = 'select * from users where username = ? and password = ?'
  var connection = db.connection()
  var sqlparam = [req.body.username,req.body.password]
  var data = {}
  connection.query(sql,sqlparam,function(err,result){
    if (err) {
      data.code = '500'
      data.msg = '查询失败'
      res.send(data)
    }else if(result){
      console.log(result)
      if(result.length>0){
        if(result[0].username == sqlparam[0] && result[0].password == sqlparam[1]){
          data.msg = '登陆成功'
          data.code = '0'
          data.avatar = result[0].avatar
          res.send(data)
        }else{
          data.msg = '用户名或密码错误'
          data.code = '500'
          res.send(data)
        }
      }else{
        data.msg = '用户名或密码错误'
        data.code = '500'
        res.send(data)
      }
      
    }
  })
  connection.end()
})
//注册
router.post('/register',(req,res) => {
  var sql = 'insert into users(username,password,age,phone,address,email,avatar) values(?,?,?,?,?,?,?)'
  var sql1 = 'select * from users where username = ?'
  var pool = db.pool()
  var data = {}
  var sqlparam = [req.body.username,req.body.password,req.body.age,req.body.phone,req.body.address,req.body.email,req.body.avatar]
  pool.query(sql1,[req.body.username],function(err,result){
    if(err){
      data.code = '500'
      data.msg = '操作失败'
      console.log(err)
      res.send(data)
    }else if(result){
      if(result.length !== 0){
        data.code = '500'
        data.msg = '用户已存在'
        res.send(data)
      }else{
        pool.query(sql,sqlparam,function(errs,results){
          if(errs){
            data.code = '500'
            data.msg = '操作失败1'
            console.log(errs)
            res.send(data)
          }else if(results){
            data.code = '200'
            data.msg = '操作成功'
            res.send(data)
          }
        })
      }
    }
    // connection.release()
  })
})
//新增用户
router.post('/addUser',function(req,res){
  var sql = 'insert into users(username,password,age,phone,address) values(?,?,?,?,?)'
  var sql1 = 'select * from users where username = ?'
  var pool = db.pool()
  var data = {}
  var sqlparam = [req.body.username,req.body.password,req.body.age,req.body.phone,req.body.address]
  pool.query(sql1,[req.body.username],function(err,result){
    if(err){
      data.code = '500'
      data.msg = '操作失败'
      console.log(err)
      res.send(data)
    }else if(result){
      if(result.length !== 0){
        data.code = '500'
        data.msg = '用户已存在'
        res.send(data)
      }else{
        pool.query(sql,sqlparam,function(errs,results){
          if(errs){
            data.code = '500'
            data.msg = '操作失败1'
            console.log(errs)
            res.send(data)
          }else if(results){
            data.code = '200'
            data.msg = '操作成功'
            res.send(data)
          }
        })
      }
    }
    // connection.release()
  })
})
//查询用户列表
router.get('/usersList',function(req,res){
  // res.send(333)
  var sql = 'select * from users'
  var pool = db.pool()
  var data = {}
  pool.query(sql,function(err,result){
    if(err){
      console.log(err)
      data.code = 500
      data.msg = '查询失败'
      res.send(data)
    }else if(result){
      data.code = 200
      result.forEach((item,index) => {
        item.password = ''
      })
      data.msg = '查询成功'
      data.list = result
      res.send(data)
    }
  })
})
//删除用户
router.post('/deleteUser',function(req,res){
  var sql = 'delete from users where username = ?'
  var params = URL.parse(req.url,true).query
  var pool = db.pool()
  var data = {}
  pool.query(sql,[req.body.username],function(err,result){
    if(err){
      console.log(err)
      data.code = '500'
      data.msg = '删除失败'
      res.send(data)
    }else if(result){
      console.log(result)
      data.code = '200'
      data.msg = '删除成功'
      res.send(data)
    }
  })
})
//用户查询
router.get('/user',function(req,res){
  var sql = 'select * from users where username = ?'
  var params = URL.parse(req.url,true).query
  var pool = db.pool()
  var data = {}
  pool.query(sql,[params.username],function(err,result){
    if(err){
      data.code = '500'
      data.msg = '查询成功'
      res.send(data)
    }else if(result){
      data.code = '200'
      data.msg = result
      res.send(data)
    }
  })
})
//修改用户
router.post('/updateUser',function(req,res){
  var params = [req.body.password,req.body.phone,req.body.age,req.body.address,req.body.username]
  var sql = 'update users set password = ?,phone = ?,age = ?,address = ? where username = ?'
  var pool = db.pool()
  var data = {}
  pool.query(sql,params,function(err,result){
    if(err){
      console.log(err)
      data.code = '500'
      data.msg = '修改失败'
      send(data)
    }else if(result){
      data.code = '200'
      data.msg = '修改成功'
      res.send(data)
    }
  })
})
//删除多条信息
router.put('/deleteList',function(req,res){
  var usernames = req.body.usernames
  var data = ''
  usernames.forEach((item,index) => {
    if(index == 0){
      data = "'"+item+"'"
    }else if(index != 0){
      data = data + ',' + "'"+item+"'"
    }
  })
  var sql = 'delete from users where username in ('+data+')'
  var pool = db.pool()
  var data = {}
  pool.query(sql,function(err,result){
    if(err){
      data.code = '500'
      data.msg = '删除失败'
      console.log(err)
      res.send(data)
    }else if(result){
      data.code = '200'
      data.msg = '删除成功'
      res.send(data)
    }
  })
})
router.get('/public/*', function (req, res) {
  res.sendFile( resolve(__dirname,'../../server') + req.url )
  console.log(resolve(__dirname,'../../server') + req.url)
})
router.post('/upload',(req,res,next) => {
  let form = new formidable.IncomingForm()
  form.uploadDir = normalize(__dirname + '/../public/upload')
  form.parse(req,(err,fieids,files) => {
    if(files.img == undefined){
      res.json({
        code:500,
        msg:'上传失败'
      })
      return
    }
    let oldPath = files.img.path
    newPath = normalize(__dirname + '/../public/upload') + '\\' + Date.now() + '.png'
    rename(oldPath,newPath,(err) => {
      if(err){
        console.log(err)
        res.json({
          code:500,
          msg:'上传失败'
        })
      }
      if(newPath){
        console.log('上传成功')
        res.json({
          code:200,
          msg:'上传成功',
          url:newPath.split('server')[1]
        })
      }
    })
  })
})
//购物车列表
router.get('/shopcarList',function(req,res){
  var sql = 'select * from shopcar where userId = ?'
  var data = {}
  var pool = db.pool()
  // console.log(req.query.userId)
  pool.query(sql,[req.query.userId],function(err,result){
    if(err){
      console.log(err)
      data.code = '500'
      data.msg = '查询失败'
      res.send(data)
    }else if(result){
      data.code = '200'
      data.msg = result
      res.send(data)
      // console.log(result)
    }
  })
})
//增加(减少)购物车商品数量
router.post('/addShopcar',function(req,res){
  var sql = 'update shopcar set name = ?,address = ?,price = ?,count = ?,allPrice = ? where id = ?'
  var sqlparam = [req.body.name,req.body.address,req.body.price,req.body.count,req.body.allPrice,req.body.id]
  var pool = db.pool()
  var data = {}
  pool.query(sql,sqlparam,function(err,result){
    if(err){
      data.code = '500'
      data.msg = '操作失败'
    }else if(result){
      data.code = '200'
      data.msg = '操作成功'
      res.send(data)
    }
  })
})
//商品列表
router.get('/goodsList',(req,res) => {
  // console.log(req.query)
  let sql = 'select * from goods where'
  let flag = 0
  for (let item in req.query) {
    if(req.query[item] != ''){
      flag++
      if(flag > 1){
        sql += ` and ${item} like '%${req.query[item]}%'`
      }else{
        sql += ` ${item} like '%${req.query[item]}%'`
      }
    }
  }
  if(flag == 0){
    sql = 'select * from goods'
  }
  let pool = db.pool()
  pool.query(sql,(err,result) => {
    if(err){
      res.json({
        code:500,
        msg:'查询失败'
      })
    }else if(result){
      res.json({
        code:200,
        msg:'查询成功',
        list:result
      })
    }
  })
})
//新增商品
router.post('/addGoods',(req,res) => {
  let sql = 'insert into goods(goodsName,type,price,count) values(?,?,?,?)'
  let pool = db.pool()
  let sqlparam = [req.body.goodsName,req.body.type,req.body.price,req.body.count]
  pool.query(sql,sqlparam,(err,result) => {
    if(err){
      res.json({
        code:500,
        msg:'新增商品失败'
      })
    }else if(result){
      res.json({
        code:200,
        msg:'新增商品成功'
      })
    }
  })
})
//修改商品信息
router.post('/updateGoods',(req,res) => {
  let sql = 'update goods set goodsName = ?,type = ?,price = ?,count = ? where id = ?'
  let sqlparam = [req.body.goodsName,req.body.type,req.body.price,req.body.count,req.body.id]
  let pool = db.pool()
  pool.query(sql,sqlparam,(err,result) => {
    if(err){
      res.json({
        code:500,
        msg:'修改失败'
      })
    }else if(result){
      res.json({
        code:200,
        msg:'修改成功'
      })
    }
  })
})
//删除商品记录
router.post('/deleteGoods',(req,res) => {
  let sql = `delete from goods where id = ${req.body.id}`
  let pool = db.pool()
  pool.query(sql,(err,result) => {
    if(err){
      res.json({
        code:500,
        msg:'删除失败'
      })
    }else if(result){
      res.json({
        code:200,
        msg:'删除成功'
      })
    }
  })
})
module.exports = router;
