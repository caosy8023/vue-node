var express = require('express');
var router = express.Router();
var db = require('../model/db')
var URL = require('url')

/* 登录*/
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
          res.send(data)
        }else{
          data.msg = '用户名或密码错误'
          data.code = '1'
          res.send(data)
        }
      }else{
        data.msg = '用户名或密码错误'
        data.code = '1'
        res.send(data)
      }
      
    }
  })
  connection.end()
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
            data.msg = '操作失败'
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
  var sql = 'select * from users'
  var pool = db.pool()
  var data = {}
  pool.query(sql,[],function(err,result){
    if(err){
      console.log(err)
      data.code = 500
      data.msg = '查询失败'
      res.send(data)
    }else if(result){
      data.code = 200
      data.msg = '查询成功'
      data.list = result
      res.send(data)
    }
  })
})
module.exports = router;
