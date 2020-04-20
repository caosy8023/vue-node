var db = require('./db')
const auth = {
  authUser:function(req, res, next){
    if(!req.session.user){
      next()
    }else{
      let auth_token = req.signedCookies['uer'];//cookie-parser直接帮我解密了
      console.log(auth_token,33333333333333333)
      if(auth_token){
        console.log(auth_token)
        next()
      }else{
        var sql = 'select * from users where username = ?'
        var connection = db.connection()
        var sqlparam = [auth_token]
        connection.query(sql,sqlparam,function(err,result){
          if(err){
            return res.end(err);
          }else{
            if(!result){
              next()
            }else{
              req.session.user = result
              next()
            }
          }
        })
        connection.end()
      }
      next()
    }
  },
  userRequired: (req, res, next) => {
    console.log(req)
    if(!req.session || !req.session.user || !req.session.username) {
        return res.redirect('/login');
    }
    next();
  }
}
module.exports = auth
