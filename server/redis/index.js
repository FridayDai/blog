const redis = require('redis');
const port = 6379;
const host = '106.15.93.13';

const client = redis.createClient({
    'host': host,
    'port': port,
    'password': '!Password1234',
    'retry_strategy': function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

client.on('error', err => {
    console.log(err);
});

client.on('connect', () => {
    console.log('redis connect success');
});

// 哈希表 类似 map
client.hmset('kitty', {
    'age': '2-year-old',
    'sex': 'male'
}, redis.print);
client.expire('kitty', 30);
client.hget('kitty', 'age', function(err, value) {
    if (err) throw err;
    console.log(value);
});

// 链表 类似 数组
client.lpush('tasks', 'Paint the house red.', redis.print);
client.lpush('tasks', 'Paint the house green.', redis.print);
client.lrange('tasks', -1, 0, function(err, items) {
    if (err) throw err;
    console.log(items);
});

// 集合 类似 Set元素不重复
client.sadd('ip', '192.168.3.9', redis.print);
client.smembers('ip', function(err, members) {
    if (err) throw err;
    console.log(members);
});

// pub/sub
