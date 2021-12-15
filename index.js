// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { clientId, token,guildId } = require('./config.json');
const utils = require('./utils')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES], fetchAllMembers: true });
let allUsers;
//getting all users from channel
const users = async () => {
    const guild = await client.guilds.fetch("fakeClientGuild")
    const members = await guild.members.cache; // returns Collection
    let users = [];
    members.find((member) => {users.push(member.user.username)})
    return users;
}

    client.once('ready', async() => {
	    console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('messageCreate', async msg => {
        if(msg.author.bot){
            //Bot shouldn't say anything unless it gets a trigger word
            return;
        }else{
            switch (msg.content) {
                case "ping":
                    msg.reply("Pong!");
                    break;
                case "draftall":
                    allUsers = await users();
                    console.log("draftall");
                    let luckyUsers = await utils.draftAll(allUsers);
                    luckyUsers.forEach(async (user, i) => {
                     msg.reply(`${i+1}. The lucky endeavor is: @${user}`);
                    });
                    break;
                case "draft":
                    console.log("draft");
                    allUsers = await users();
                    let luckyUser = await utils.draft(allUsers);
                    msg.reply(`The lucky endeavor is: @${luckyUser}`);
                    break;
            }
            }
        });

// Login to Discord with your client's token
client.login(token);