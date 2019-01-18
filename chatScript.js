/* resizes textarea to fit text */
console.log(localStorage.getItem("token"));
var username;

/* connects to server socket, sending the auth token
 https://socket.io/docs/client-api/#new-manager-url-options */
var socket = io.connect({ query: { token: localStorage.getItem("token") } });

/* upon error in auth, server disconnects the socket */
socket.on('closeReason', (reason) => {
    console.log(reason);
    localStorage.removeItem("token");
    /* redirect to login/signup */
    setTimeout(() => {
        window.location = "/";
    }, 3000);
});

/* recieve username */
socket.on("yourUsername", data => { this.username = data; });

/* initial history loading */
socket.on("history", data => {
    data.forEach(element => {
        mineOrNotAppend(element);
    });
});

/* upon receiving message */
socket.on('message', function (data) {
    console.log("received: ", data);
    mineOrNotAppend(data);
});

/* distinguishes if the message's username is mine or not
and calls the appropriate method */
function mineOrNotAppend(data) {
    if (data.username == this.username) {
        appendOwnMessage(data);
    } else {
        appendOthersMessage(data);
    }
    window.scrollTo(0,document.body.scrollHeight);    
}

/* appends message as somebody else's (red) */
function appendOthersMessage(data) {
    $("#messages").append(' <div class="w3-mobile w3-panel w3-pale-red w3-leftbar w3-border-red w3-animate-left"> <h3>    <b class="name">' + data.username + '</b> </h3> <blockquote class="w3-xlarge w3-serif"> &#10077    <i> ' + data.message + ' </i> &#10080 </blockquote> <p><i>'+data.created_at.slice(0, 10)+' '+data.created_at.slice(11,19)+'</i></p></div>');
}

/* appends message as own (green) */
function appendOwnMessage(data) {
    $("#messages").append(' <div class="w3-mobile w3-panel w3-pale-green w3-rightbar w3-border-green w3-animate-right"> <h3>    <b class="name">' + data.username + '</b> </h3> <blockquote class="w3-xlarge w3-serif"> &#10077    <i> ' + data.message + ' </i> &#10080 </blockquote> <p><i>'+data.created_at.slice(0,10)+' '+data.created_at.slice(11,19)+'</i></p></div>');
}

/* autoadjusts textarea's height so that the whole message is visible */
var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
}
function OnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }


/* emits message and clears text area */
function sendMessage() {
    var message = $("#textArea").val();
    $("#textArea").val('');
    socket.emit("message", message);
}

function logout(){
    localStorage.removeItem("token");
    socket.close();
    window.location = "/";
}

/* sends message when enter clicked */
function process(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
        sendMessage();
    }
}
