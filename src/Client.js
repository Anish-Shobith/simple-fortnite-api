const fetch = require('node-fetch');
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

        this.headers = { headers: { 'TRN-Api-Key': key } }

        this.rateLimit = {
            limit: 30,
            remaining: 30
        };

    }

    /**
     * Get user info
     * @param {string} username username of the user to search for
     * @param {string=} [platform='pc'] platform to search for user in (pc, xbl, or psn)
     * @returns {(Promise<Profile>|Promise<Object>)}
     * @memberof Client
     */
    async find(username, platform = 'pc') {
        if (!username) throw new Error('You must supply a username');
    
        if (typeof username !== 'string') throw new TypeError(`Username expects a string, ${typeof username} given`);
        if (typeof platform !== 'string') throw new TypeError(`Platform expects a string, ${typeof platform} given`);
    
        const result = await fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${encodeURIComponent(username)}`, this.headers);
        const data = await result.json();
    
        // Invalid API Key
        if (data.message === 'Invalid authentication credentials') throw new Error(data.message);
    
        // Handling Player Not Found error
        if (data.error === 'Player Not Found') return { code: 404, error: 'Player Not Found' };
        // Handling any other error
        else if (data.error) return data;
    
        return new Profile(data);
      }
}

module.exports = Client;
