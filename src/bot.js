require('dotenv').config();

const { Client, Intents, Guild, Channel, Message, MessageEmbed  } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"] });
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const prefix = '$';
const url = 'https://monsterhunterrise.wiki.fextralife.com';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
  let targetUser = newPresence.member;
  if (newPresence.activities[0] != undefined && targetUser.voice.channel != undefined) {
    console.log(`${targetUser.displayName} is now playing ${newPresence.activities[0].name}`);
    if (newPresence.activities[0].name.toLowerCase() == "league of legends") {
    //const channel = client.channels.cache.get('938895229229080601');
    //channel.send(`User: ${targetUser.displayName} has been sentenced to execution.`);
    await targetUser.voice.setChannel('849023371652235264');
    }
  }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let targetUser = oldState.member;
  let currentActivity = targetUser.presence.activities[0].name;
  console.log(`${targetUser.displayName} is now playing ${currentActivity.name}`);
  if (newState.channel != undefined && currentActivity.toLowerCase() === "league of legends") {
    //const channel = client.channels.cache.get('938895229229080601');
    //channel.send(`User: ${targetUser.displayName} has been sentenced to execution.`);

    await targetUser.voice.setChannel('849023371652235264');
  }
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(prefix.length)
      .split(" ");

    // Monster Hunter Rise lookup
    if (CMD_NAME == "mhr") {
      if (args != undefined) {
        try {
        const { data } = await axios.get(url + '/' + args);

        const $ = cheerio.load(data);

        const listItems = $(".infobox tbody tr");
        let itemsArr = []
        let jsonified = {};
        listItems.each((index, element) => {
          if (index <= 1) {
            itemsArr.push($(element));
          }
          else {
            jsonified[$(element).find('td').eq(0).text()] = {
              name: $(element).find('td').eq(0).text(),
              value: $(element).find('td').eq(1).text()
          };
          }
        });

        let img = url + itemsArr.pop().children('td').find('img').attr('src');
        let title = itemsArr.pop().text();
        const embeded = {
          color: 0x0099ff,
          title: title,
          thumbnail: { 
            url: img,
          },
          url: `${url}/${args}`,
          fields: [
            Object.values(jsonified)
          ],
        };
        message.channel.send({ embeds: [embeded] });
        }
        catch(error) {
          message.channel.send(`Error: ${args} is not a monster from monster hunter you dumbass`);
        }
      } 
    }
  }
});

client.login(process.env.DISCORD_TOKEN);