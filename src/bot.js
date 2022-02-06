require('dotenv').config();
const Danbooru = require('danbooru')

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

//client.on('presenceUpdate', async (oldPresence, newPresence) => {
//  let targetUser = newPresence.member;
//  if (newPresence.activities[0] != undefined && targetUser.voice.channel != undefined) {
//    console.log(`${targetUser.displayName} is now playing ${newPresence.activities[0].name}`);
//    if (newPresence.activities[0].name.toLowerCase() == "league of legends") {
    //const channel = client.channels.cache.get('938895229229080601');
    //channel.send(`User: ${targetUser.displayName} has been sentenced to execution.`);
//    await targetUser.voice.setChannel('849023371652235264');
//    }
//  }
//});

//client.on('voiceStateUpdate', async (oldState, newState) => {
//  let targetUser = oldState.member;
//  let currentActivity = targetUser.presence.activities[0].name;
//  console.log(`${targetUser.displayName} is now playing ${currentActivity.name}`);
//  if (newState.channel != undefined && currentActivity.toLowerCase() === "league of legends") {
    //const channel = client.channels.cache.get('938895229229080601');
    //channel.send(`User: ${targetUser.displayName} has been sentenced to execution.`);

//    await targetUser.voice.setChannel('849023371652235264');
//  }
//});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(prefix.length)
      .split(" ");

    // Help menu
    if (CMD_NAME == "help") {
      help(message)
    }
    // Monster Hunter Rise lookup
    else if (CMD_NAME == "mhr") {
      mhr(args, message);
    }
    // Danbooru lookups 
    else if(CMD_NAME == "manga") {
      dlookup(args, message);
    }
  }
});

//Help function
function help(message) {
  message.channel.send(
    "Hello my name is Wakanai! My prefix is [$]. \n" +
    "----------Command Available---------- \n" +
    "$manga <input> | Look up an image on Danbooru based on your input, without input it will look up a completely random image. \n" +
    "$mhr <input> | Look up a monster from Monster Hunter Rise based on input. "
    );
}

// Danbooru lookup
function dlookup(args, message) {
  args = args.join('_');
  const booru = new Danbooru();
  booru.posts({ tags: 'rating:safe order:random '+args }).then(posts => {
    // Select a random post from posts array
    if (posts.length < 1){
      message.channel.send("Couldn't find any matches :( try again.");
    }else{
    const index = Math.floor(Math.random() * posts.length);
    const post = posts[index];
    console.log(`Looked up ${args}`);
    console.log(post.file_url);
    console.log(post.md5);
    console.log(post.file_ext);

    message.channel.send({files: [post.file_url]});
  }
});

}

// Monster hunter lookup
async function mhr(args, message) {
  if (args != undefined) {
    try {
    args = args.join('+');
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
      url: `${url}/${args}`,
      thumbnail: {
        url: img
      },
      fields: [
        Object.values(jsonified),
      ],
      footer: { 
        text: 'https://github.com/Phillodelphia/Wakanai-discordbot', 
        iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png' 
      },
    };
    message.channel.send({ embeds: [embeded] });
    }
    catch(error) {
      message.channel.send(`Error: ${args} is not a monster from monster hunter you dumbass`);
    }
  } 
}

client.login(process.env.DISCORD_TOKEN);
