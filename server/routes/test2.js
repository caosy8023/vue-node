const fs = require('fs')
const {resolve} = require('path')
const querystring = require('querystring')

const path = resolve(__dirname,'../public/upload/1571033549648.png')
const rs = fs.createReadStream(path)
rs.on('data',(data) => {
    console.log(data)
})
rs.on('end',() => {
    console.log('end')
})
rs.on('err',(err) => {
    console.log(err)
})
const ws = fs.createWriteStream('d.jpg')
rs.pipe(ws)
let res = fs.readFileSync('app.js')
console.log(res)
fs.writeFileSync('1.txt',res)
