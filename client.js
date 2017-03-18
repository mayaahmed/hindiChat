var socket = io.connect();
 var name;


 

function onMessage(text) {
var chat = document.getElementById('chat');
var el = document.createElement('div');
el.className = "messageClass";
    el.innerHTML = text;
        chat.appendChild(el);
}



var idButton = document.getElementById('idSubmitButton');
idButton.addEventListener('click', function (e) {
    var input = document.getElementById('nameInput');
if(input.value =='') alert('Invalid name');   
else{
 name = input.value;
    socket.emit('new user', name);
       input.value = '';
    document.getElementById('idDiv').style.visibility="hidden";
    document.getElementById('chat-controls').style.visibility="visible";
    onMessage('Welcome ' + name); }
	e.preventDefault();
    });

var messageButton = document.getElementById('messageButton');
messageButton.addEventListener('click', function (e) {
    var input = document.getElementById('message');
    var value = input.value;
    socket.emit('new message', name, value);
    input.value = '';
  //  onMessage( value);
    e.preventDefault();
    });


socket.on('display message', function(text, message){
onMessage(text+': '+message);

});

var namesList = document.getElementById('usersDiv');
function usersDisplay(text) {
var el = document.createElement('div');
el.className = "nameClass";
    el.innerHTML = text;
        namesList.appendChild(el);
}

socket.on('display users', function(users){
 namesList.innerHTML='';
var i;
for(i=0;i<users.length;i++){
console.log(users[i]);
usersDisplay(users[i]);
}
});





