const fetch = require('../node_modules/node-fetch');
const Package = require('../package.json');
const Profile = require('./Profile');

/**
 * The client for interacting with the Fortnite Tracker API
 * @class Client
 * @param {string} key Fortnite Tracker API token
 */
class Client {
    constructor(key) {

        if (!key) {
            throw new Error('No API key passed.');
        }

        this.key = key;

        this.headers = {
            'User-Agent': `fortnite.js v${Package.version} (${Package.homepage})`,
            'TRN-Api-Key': this.key
        };

        this.rateLimit = {
            limit: 30,
            remaining: 30
        };

    }

    /**
     * Makes the request to the API
     * @private
     * @param {string} link URL endpoint of API
     * @returns {Promise<Object>}
     * @memberof Client
     */
    _request(link) {
        return fetch(link, { headers: this.headers })
            .then(r => {
                this.rateLimit = {
                    limit: Number(r.headers.get('x-ratelimit-limit-minute')),
                    remaining: Number(r.headers.get('x-ratelimit-remaining-minute'))
                };

                if (!r.ok) return Promise.reject(r.statusText);

                return r.json();
            })
            .catch(e => Promise.reject(`HTTP ${e}`));
    }

    /**
     * Get user info
     * @param {string} username username of the user to search for
     * @param {string=} [platform='pc'] platform to search for user in (pc, xbl, or psn)
     * @param {boolean=} [raw=false] whether to return raw response from API
     * @returns {(Promise<Profile>|Promise<Object>)}
     * @memberof Client
     */
    find(username, platform = 'pc', raw = false) {
        return this._request(`https://api.fortnitetracker.com/v1/profile/${platform}/${encodeURI(username)}`)
            .then(r => r.error ? Promise.reject(r) : r)
            .then(r => raw ? r : new Profile(r))
            .catch(e => Promise.reject(e));
    }
}

module.exports = Client;
