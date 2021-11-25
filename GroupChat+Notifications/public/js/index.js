
let socket = io( 'http://localhost:8888' );

const person=prompt("What is your name?");



$( '.messageForm' ).on( 'submit', function(event){
    event.preventDefault();
    
    let userName = person;
    if(userName==null){
        alert("You must provide a name before chatting!!!")
    }else{
    let userMessage = $( '#userMessage' ).val();

    let send = {
        name: userName,
        message: userMessage
    };

    socket.emit( 'sendMessage', send );
    document.querySelector("form").reset();



}});

$('#notification').on ('click', function(event){
    console.log("button pressed")
    event.preventDefault();
   socket.emit('notifyAll');
})
socket.on('notification', function(data){
    $('.notificationBox').append(data.message);
})

socket.on('join', function(data){
    $('.notificationBox').append(data.message)
})
socket.emit('join', function(data){
    $('.notificationBox').append(data.message)
})

socket.on( 'sendAll', function( data ){
    let newMessage = `<p> ${data.name}: ${data.message} </p>`;
    $( '.messageBox' ).append( newMessage );
});

socket.on('disconnect', function (socket) {

  
    socket.on('disconnect', function(data){
        
    })
  
    

});