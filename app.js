class Messenger {
}
var ws = new WebSocket("ws://localhost:444")
ws.addEventListener("open", () =>{
    console.info("[DEBUG] Websocket Open.")
  });
   
  ws.addEventListener('message', function (event) {
    console.debug(`[INBOUND] > ` + event.data)
  });
  ws.addEventListener('close', event => {
    console.info("[DEBUG] Websocket Closed.")
  })
  
  function send(input) {
    console.log(`[OUTBOUND] > ${input}`)
    ws.send(input)
  }

  function thing() {
  var node = document.getElementById("INPUT");
node.addEventListener("keyup", function(event) {
    console.log(event.key)
    if (event.key === "Enter") {
        send(document.getElementById('INPUT').value)
        document.getElementById("INPUT").value = "";
    }
});
    }

window.onresize = function () { if (window.innerWidth < 900 || window.innerHeight < 600) { window.resizeTo (1024,800); } };
