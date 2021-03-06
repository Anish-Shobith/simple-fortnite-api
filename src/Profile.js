/**
 * An API returned Account object
 * @class Account
 */
class Profile {
    constructor(content) {
        this.id = content.accountId;
        this.platform = content.platformName;
        this.username = content.epicUserHandle;
        this.url = `https://fortnitetracker.com/profile/${this.platform}/${this.username}`
        this.image = 'https://i.imgur.com/xUcA9gT.png'
  
        /**
         * Stats for solo game mode
         * @type {Object}
         * @property {Object} solo.score Score in solo
         * @property {Object} solo.wins Number of wins in solo
         * @property {Object} solo.top3 Number of times in top 3 in solo
         * @property {Object} solo.top5 Number of times in top 5 in solo
         * @property {Object} solo.top6 Number of times in top 6 in solo
         * @property {Object} solo.top12 Number of times in top 12 in solo
         * @property {Object} solo.top25 Number of times in top 25 in solo
         * @property {Object} solo.kd Kill/Death ratio in solo
         * @property {Object} solo.winRatio Win ratio in solo
         * @property {Object} solo.matches Number of matches in solo
         * @property {Object} solo.kills Number of kills in solo
         * @property {Object} solo.scorePerMatch Score per match in solo
         */
        this.solo = this.gameTypes(content.stats.p2);
  
        /**
         * Stats for duo game mode
         * Has same properties as solo
         * @type {Object}
         */
        this.duo = this.gameTypes(content.stats.p10);
  
        /**
         * Stats for squad game mode
         * Has same properties as solo
         * @type {Object}
         */
        this.squad = this.gameTypes(content.stats.p9);
  
        /**
         * Lifetime stats for the user
         * @type {Object}
         * @property {string} stats.top3 Number of times in top 3
         * @property {string} stats.top5 Number of times in top 5
         * @property {string} stats.top6 Number of times in top 6
         * @property {string} stats.top12 Number of times in top 12
         * @property {string} stats.top25 Number of times in top 25
         * @property {string} stats.score Lifetime score
         * @property {string} stats.matches Number of matches
         * @property {string} stats.wins Number of wins
         * @property {string} stats.winPercent Win percentage
         * @property {string} stats.kills Number of kills
         * @property {string} stats.kd Kill/Death ratio
         */
        this.lifetime = this.lifetime(content.lifeTimeStats);
    }
  
    lifetime(oldStats) {
        const stats = {};
        for (let s of oldStats) {
            stats[s.key] = s.value;
        }
  
        return {
            top3: stats['Top 3s'],
            top5: stats['Top 5s'],
            top6: stats['Top 6s'],
            top12: stats['Top 12s'],
            top25: stats['Top 25s'],
            score: stats['Score'],
            matches: stats['Matches Played'],
            wins: stats['Wins'],
            winPercent: stats['Win%'],
            kills: stats['Kills'],
            kd: stats['K/d']
        };
    }
  
    gameTypes(game) {
        const newGame = {};
        for (const s in game) {
            const data = game[s];
            newGame[s] = data.value;
        }
        return {
            top3: newGame['top3'],
            top5: newGame['top5'],
            top6: newGame['top6'],
            top12: newGame['top12'],
            top25: newGame['top25'],
            score: newGame['score'],
            matches: newGame['matches'],
            wins: newGame['top1'],
            winRatio: newGame['winRatio'],
            minutesPlayed: newGame['minutesPlayed'],
            scorePerMin: newGame['scorePerMin'],
            kills: newGame['kills'],
            kd: newGame['kd']
        };
    }
  }
  
  module.exports = Profile;
