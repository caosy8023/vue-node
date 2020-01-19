const db = require('../model/db')
const https  = require('https')
const http = require('http')
const fs = require('fs')
const {resolve} = require('path')

const puppeteer = require('puppeteer')
let crawler = async () => {
    const browser = await puppeteer.launch({
        headless:true
    })
    const page = await browser.newPage()
    await page.goto('https://uland.taobao.com/sem/tbsearch?refpid=mm_26632258_3504122_32538762&clk1=782ac7d89cc9a118510146eb33309eed&keyword=手机&page=0',{waitUntil: 'networkidle2'})
    await timeout()
    let result = await page.evaluate(() => {
        let data = []
        // let list = $('.screening-bd> .ui-slide-content> .ui-slide-item')
        let list = $('#searchResult>.view>.item>a')
        for(let i=0;i < list.length;i++){
            let img = ''
            if($(list[i]).find('.imgContainer>.imgLink>img').attr('data-ks-lazyload')){
                img = $(list[i]).find('.imgContainer>.imgLink>img').attr('data-ks-lazyload')
            }else{
                img = $(list[i]).find('.imgContainer>.imgLink>img').attr('src')
            }
            data.push({
                type:'手机',
                goodsName:$(list[i]).find('.info>.title').attr('title'),
                price:parseInt($(list[i]).find('.info>.price strong').text()),
                count:parseInt((Math.random() * 10000)),
                img:img
            })
        }
        console.log(data)
        return data
    })
    // console.log(result)
    let arr = []
    let sql = 'insert into goods(type,goodsName,price,count,img) values(?,?,?,?,?)'
    let sqlParam = []
    let connection = db.connection()
    
    for(let i=0;i < result.length;i++){
        // if(result[i].title){
        //     arr = result[i].img.split('/')
        //     id = arr[arr.length-1].split('.')[0]
        //     console.log(id)
        // }
        // sqlParam = [id,result[i].title,result[i].rate,result[i].region,result[i].director,result[i].actors,result[i].duration,result[i].release,result[i].toUrl,result[i].img]
        // // console.log(sqlParam)
        // if(result[i].title){
        //     obj.saveCrawler(connection,sql,sqlParam)
        // }
        let url = `http:${result[i].img}`
        let path = resolve(__dirname,`../public/images/${Date.now()}${i}.png`)
        let path1 = path.split('server')[1]
        saveImg(url,path)
        sqlParam = [result[i].type,result[i].goodsName,result[i].price,result[i].count,path1]
        saveCrawler(connection,sql,sqlParam)
        console.log(path1)
    }
    // obj.saveCrawler(connection,sql,sqlParam)
    db.close(connection)
    await browser.close()
}
let saveCrawler = async (connection,sql,sqlParam) => {
    connection.query(sql,sqlParam,function(err,result){
        if(err){
            console.log(err)
        }else if(result){
            console.log('插入成功'+result)
        }
    })
}
function timeout(){
    return new Promise(resolve => setTimeout(resolve,500))
}

const saveImg = function(url,path){
    let http2 = ''
    if(url.substring(0,5) == 'https'){
        http2 = https
    }else{
        http2 = http
    }
    http2.get(url,(req,res) => {
        let datas = ''
        req.on('data',(data) => {
            datas += data
        })
        req.setEncoding('binary')
        req.on('end',() => {
            fs.writeFile(path,datas,'binary',(err) => {
                if(!err){
                    console.log('保存成功')
                }
            })
        })
    })
}
crawler()