var ws = new WebSocket('ws://claire:8080');

ws.onopen = function() {
   // ws.send("Connection open");   //not necessarily required
};


//create new "p" HTML element, attach event.data (the text in textfield when it changes
//this event is fired each time a message is sent through the websocket ($conn->send...)
ws.onmessage = function(event) {

    if (event.data.includes("clearPrevious")) {
        clearPrevious();        
    } else {
        //insert new elements
        var newHTML = document.createElement('p');
        newHTML.innerHTML = event.data;
        document.body.appendChild(newHTML);
        console.log("creating new line");
    }
};


//find the textbox that user enters text into and send the value
var echofield = document.getElementById("textbox");

sendTextBox = function() {
    ws.send(echofield.value);
    echofield.value = ""; // clear textbox after sending text
};


//add event listener to the textbox, call sendTextBox function on "change" event
echofield.addEventListener("change", sendTextBox);


//clear p elements from previous load
function clearPrevious() {
    var elements = document.getElementsByTagName('p');
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
   console.log("clearing");
}

function createNew() {
    var newHtml = docunemt.createElement('p');
    newHTML.innerHTML = event.data;
    document.body.appendChild(newHTML);
}
