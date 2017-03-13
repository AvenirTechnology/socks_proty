var ws = new WebSocket('ws://durandal:8080');
var incr = 0;

window.onbeforeunload = function (e) {
    ws.close();
};

ws.onmessage = function(event) {
    if (event.data.match(/tr[0-9]*d[0-9]*/)) {
        var cell = event.data.split(':__:');
        var cellElement = document.getElementById(cell[0]);
        if (cellElement != null) {
            cellElement.innerText = cell[1];
        } else {

            var row = cell[0].split(/\D+/)[1];
            var col = cell[0].split(/\D+/)[2];

            var prevNode = document.getElementById("tr"+row+"d"+parseInt(col-1));

            prevNode.parentNode.insertBefore(makeCell(cell[0],cell[1]), prevNode.nextSibling);
            prevNode.parentNode.style.columnCount = prevNode.parentNode.childNodes.length;
            prevNode.parentNode.style.columnGap = "0px";

        }
    } else {
        var newRow         = document.createElement (/*'tr'*/'div');
        newRow.id = "tr" + incr;
        inc2 = 0;
        var arrStr = event.data.split(',');
        for (var i = 0, len = arrStr.length; i < len; i++) {
            var newId = "tr" + incr + "d" + inc2++;
            newRow.appendChild(makeCell(newId, arrStr[i].trim()));
        }
        incr++;
        newRow.style.columnCount = newRow.childNodes.length;
        newRow.style.columnGap = "0px";
        document.getElementById("datatable").appendChild (newRow);
    }
};

var echofield = document.getElementById("echobox");
var table = document.getElementById("datatable");

function sendCellUpdate(e) {
    if (e.target !== e.currentTarget) {
        var targetId = e.target.id;
        ws.send(targetId + ":__:" + e.target.innerText);
    }
    e.stopPropagation();
};

function funnel() {
    ws.send(echofield.value);
    echofield.value = "";
};

function makeCell(id, content) {
    var newCell = document.createElement(/*'td'*/'div');
    newCell.id = id;
    newCell.innerText = content;
    newCell.contentEditable = true;
    return newCell;
};

echofield.addEventListener("change", funnel);
table.addEventListener("input", sendCellUpdate);
