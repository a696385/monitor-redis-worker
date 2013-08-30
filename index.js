/**
 * Powered by Andy <andy@away.name>
 * Date: 30.08.13
 */

var redisConfig = {
    port: 6379,
    host: 'redis1.vmc.loc',
    options: {}
},
    redisLocalhostConfig = {
        port: 6379,
        host: 'localhost',
        options: {}
    };

var os = require('os'),
    worker = require('monitor-worker');

var monitor = worker.createClient(os.hostname(), 'Redis monitor', redisConfig, {waitReconnect: true});
monitor.register(function(err){
    if (err){
        console.error('Can not register monitor');
    } else {
        console.log('Registered');
    }
});
worker.registerWatchers(monitor, ['total-cpu', 'total-memory', 'redis-memory', 'redis-data-size', 'redis-commands'], {
    'redis-memory': redisLocalhostConfig,
    'redis-data-size': redisLocalhostConfig,
    'redis-commands': redisLocalhostConfig
});

