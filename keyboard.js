
var string = "";
var letter =  document.getElementById("message");

function alphabet_write(x)
{
  string=string+x;
  letter.value = string;
  }

letter.onkeypress = function(e) {
x=String.fromCharCode(e.keyCode);
 string=string+x;
}

var messageButton = document.getElementById('messageButton');
messageButton.addEventListener('click', function (e) {
string = "";
 e.preventDefault();
});

function keyboard_c()
{
string = string.substr(0, string.length-1); 
 letter.value = string;
}
