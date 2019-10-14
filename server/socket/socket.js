var socket = require("socket.io")
socket.getIo = function(server){
    var io = socket.listen(server)
    var chat = io.of('/chat')
    chat.on('connection',function(socket){
        socket.on('msg',(data) => {
            console.log(data)
            chat.emit('msg',data)
        })
    })
    return io
}

module.exports = socket