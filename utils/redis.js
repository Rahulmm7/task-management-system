const redis = require('redis');

function main() {
    const redisPort = 6379;
    const client = redis.createClient(redisPort);

    // log error to the console if any occurs
    client.on('error', (err) => {
        console.log('redis error', err);
    });
    return client;
}

module.exports = main();
