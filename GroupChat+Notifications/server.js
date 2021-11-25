const express = require( 'express' );
const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(8888);

const io = require( 'socket.io' )( server );
const chatlog=[];

io.on( 'connection', function( socket ){
 
    socket.on('join', function(){
        console.log(socket.id);
        let newMessage = `<p> Socket id: ${socket.id} joined the chatt!!! </p>`;
        io.sockets.emit( 'join', {message: newMessage});    
    })

    socket.on( 'general', function( data ){
        chatlog.push(data);
        
        io.sockets.emit( 'listenAll', {message: "Broadcast message"} )
    });

    socket.on( 'sendMessage', function( data ){
        io.sockets.emit( 'sendAll', data );
    });

    socket.on ('notifyAll', function(){
        console.log("listen, button pressed server!")
        let newMessage= `<p> Socket id: ${socket.id} just triggered a notification!! </p>`;
        io.sockets.emit('notification', {message:newMessage}); 
    })
    
});
io.on('disconnect', function (socket) {
    
    socket.on('disconnect', function(){
    console.log("leaving",socket.id);
    let message=`<p> Socket id: ${socket.id} left the chatt!!! </p>`;
    io.sockets.emit('left',{message:message});
    })

});