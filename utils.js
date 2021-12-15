const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const { clientId, guildId, token } = require('./config.json');

const draftAll = async (users) =>{
    let usersArray = [];
    let index; 

    for (let i = 0; i < 5; i++) {
        index = getRandomInt(users.length);
        usersArray.push(users[index])
      }
      return usersArray
}

const draft = async (users) =>{
    index = getRandomInt(users.length);
    return users[index];
}
function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
}
exports.draft = draft
exports.draftAll = draftAll