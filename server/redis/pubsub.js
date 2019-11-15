var redis = require('redis');
const port = 6379;
const host = '106.15.93.13';
var clientA = redis.createClient({
    'host': host,
    'port': port,
    'password': '!Password1234'
});
var clientB = redis.createClient({
    'host': host,
    'port': port,
    'password': '!Password1234'
});

clientA.on('message', function(channel, message) {
    console.log('Client A got message from channel %s: %s', channel, message);
});
clientA.on('subscribe', function(channel, count) {
    setInterval(() => {
        clientB.publish('main_chat_room', 'Hello world!');
    }, 1000);
});
clientA.subscribe('main_chat_room');
