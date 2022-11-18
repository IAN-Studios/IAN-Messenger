## Notes (For Later)

# Client >> Server Commands
authenticate <Username, Password>   // Attempts Authentication with server
postMsg <ChannelID, Content>        // Tells the server to please post a message
error <Something>                   // Informs the server of a client error containing *something*


# Server >> Client Commands
requestAuthentication               // Requests client to authenticate before continuing. If user is signed in, client returns token.
authResponse <response>             // Response to client from server on authentication result. Used for informing user of login status.
systemBroadcast  <message>          // Broadcasts a message from *SYSTEM* to all clients.
clientUpdate <changes>              // Updates *Something*.