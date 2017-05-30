'use strict';

import Memcached from 'memcached';

export default class Cache {
    constructor(...args) {
        this._cache = new Memcached(...args);
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this._cache.get(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data || null);
                }
            });
        });
    }

    set(key, value) {
        return new Promise((resolve, reject) => {
            this._cache.set(key, value, 0, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    invalidate() {
        return new Promise((resolve, reject) => {
            this._cache.flush(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};
