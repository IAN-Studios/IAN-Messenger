class MessengerClient {
    constructor(authenticated, ipaddr) {
        this.authenticated = authenticated;
        this.ipaddr = ipaddr;
    }
}

module.exports = MessengerClient;