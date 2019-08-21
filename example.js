const fortnite = require("simple-fortnite");

// Make sure you set your own key, otherwise it won't work!
// Check the README for more info on obtaining your key.

const client = new fortnite('my api key');

const result = await client.get('strandable', fortnite.PC)
console.log(result)