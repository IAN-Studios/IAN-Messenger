const { WebSocketServer } = require("ws");
const ws = require("ws");
const http = require("http");
const fs = require("fs")
const mime = require("mime")
const msgcli = require("./classes/messengerclient");
const MessengerClient = require("./classes/messengerclient");

const wss = new WebSocketServer({port:444})

var sessions = [];

    wss.on("connection",(ws, msg) => {
        var authenticated = false;
        console.log(`client connected: ${msg.socket.address().address}:${msg.socket.address().port}`)
        sessions.forEach(item => {
            try {
                if (item.ipaddr != msg.socket.remoteAddress) {
                    ws.send("0,srv,Authenticate to continue")
                    sessions.push(new MessengerClient(authenticated, msg.socket.remoteAddress));
                    
                }
            } catch {
                ws.send("0,srv,Authenticate to continue")
                sessions.push(new MessengerClient(authenticated, msg.socket.remoteAddress));
            }
        })
        if (sessions.length == 0) {ws.send("0,srv,Authenticate to continue");sessions.push(new MessengerClient(authenticated, msg.socket.remoteAddress));}

        // On Inbound Message
        ws.on("message", (data, isbinary) => {
            if (data.toString().startsWith("authenticate(")) {
                authenticated = true;
                sessions.forEach(item => {if (item.ipaddr == msg.socket.remoteAddress){ item.authenticated = true; }})
            }
            sessions.forEach(item => {
                try {
                    if (item.ipaddr == msg.socket.remoteAddress) {
                        if (item.authenticated == false) {
                        ws.send("0,srv,Authenticate to continue")
                        return;
                        }
                    }
                } catch {
                    ws.send("0,srv,Authenticate to continue")
                    return;
                }
            })


            console.log(`Client has sent us: ${data}`)
            ws.send(`Message Acknowledged: ${data}`);
            if (data == "i am mr gay") {
                ws.send('i am mr gay');
            }
        });
        
        // handling what to do when clients disconnects from server
        ws.on("close", () => {
            console.log("the client has disconnected");
        });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        client.send(msg);
     });
 };

const srv = http.createServer().listen(80);

srv.on("request", (req, res) => {
    if (req.url == "/app") {
        try {
            var d = fs.readFileSync("./app.html")
            res.statusCode = 200;
            res.setHeader('Content-Type', "Text/HTML")
            res.write(d);
            res.end();
        } catch (err) {
            console.log(err)
        }
    } else if (req.url == "/favicon.ico") {
        var d = fs.readFileSync("./favicon.ico")
        res.statusCode = 200;
        res.setHeader('Content-Type', "image/vnd.microsoft.icon")
        res.write(d);
        res.end();
    } else if (req.url == "/app.js") {
        var d = fs.readFileSync("./app.js")
        res.statusCode = 200;
        res.setHeader('Content-Type', "text/javascript")
        res.write(d);
        res.end();
    } else {
        try {
            var d = fs.readFileSync("./app.html")
            res.statusCode = 200;
            res.setHeader('Content-Type', "text/html")
            res.write(d);
            res.end();
        } catch (err) {
            console.log(err)
        }
    }
})