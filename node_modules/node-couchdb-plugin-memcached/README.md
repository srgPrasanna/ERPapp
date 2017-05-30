# node-couchdb-plugin: memcached [![Build Status](https://secure.travis-ci.org/1999/node-couchdb-plugin-memcached.svg?branch=master)](http://travis-ci.org/1999/node-couchdb-plugin-memcached) [![Dependency Status](https://david-dm.org/1999/node-couchdb-plugin-memcached.svg)](https://david-dm.org/1999/node-couchdb-plugin-memcached) [![devDependency Status](https://david-dm.org/1999/node-couchdb-plugin-memcached/dev-status.svg)](https://david-dm.org/1999/node-couchdb-plugin-memcached#info=devDependencies)

Plugin for [node-couchdb](https://www.npmjs.com/package/node-couchdb) to store cache inside Memcached.

## API
```javascript
const Cache = require('node-couchdb-plugin-memcached');

// accepts same arguments as `memcached` package constructor
const cacheInstance = new Cache('192.168.0.102:11211', {retry: 0});
```
