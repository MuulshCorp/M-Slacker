const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
require("opusscript");
const config = require("./data/config.json");

client.on("ready", () => {
  console.log(`Le bot est lancé avec ${client.users.size} utilisateurs, dans ${client.channels.size} salons, de ${client.guilds.size} serveurs. Son préfix est `+config.prefix);
  client.user.setActivity(config.prefix+`help | Aider ${client.guilds.size} serveurs`);
});

client.on("guildCreate", guild => {
  console.log(`Nouveau serveur rejoint : ${guild.name} (id: ${guild.id}). Ce serveur a ${guild.memberCount} membres!`);
  client.user.setActivity(config.prefix+`help | Aide ${client.guilds.size} serveurs`);
});

client.on("guildDelete", guild => {
  console.log(`J'ai été retirer du serveur : ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(config.prefix+`help | Aide ${client.guilds.size} serveurs`);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'accueil');
  if (!channel) return;
  channel.send({embed: {
    color: 3447003,
    title: `Bienvenue ${member} !`,
    thumbnail: member.iconURL,
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Slacker Company"
    }
  }
});
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'accueil',);
  if (!channel) return;
  channel.send({embed: {
    color: 3447003,
    title: `A bientôt ${member} !`,
    thumbnail: member.iconURL,
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Slacker Company"
    }
  }
});
});

client.on("message", async message => {
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if (!message.content.startsWith(config.prefix) || message.author.bot) return;
if(message.content.indexOf(config.prefix) !== 0) return;
//tu commence les commandes a partir d'ici !
/* efface ce commentaire si tu a compris pour les commandes ca sera toujours : if (command === "ta commande sans le prefix") {message.channel.send('ton message ici')}
 */

if (command === "ping") {
	message.channel.send('pong')};

if (command === "help1") {
        message.channel.send({embed: {
         color: 3447003,
         title: Hey ${message.author.username} !,
         description: "Hey ! Voici les  différents menu !",
         fields: [	      
         {  
         name: "Les menu",
        
        config.prefix+"help1 =le menu principal \n" + 
        config.prefix+"help2 =le menu de culture \n" +
        config.prefix+"help3 =le menu d \n" + 
        config.prefix+"help4 = \n" + 
       
      },
      {
        name: "Invitation",
        value: Tu souhaite m'inviter sur un autre serveur ? Voici l'invit : [Clique ici](https://discordapp.com/oauth2/authorize?client_id=446570163974832138&permissions=8&scope=bot)
      },
      {
        name: "Serveur",
        value: "Tu souhaite rejoindre le serveur de la Slacker Company ? [C'est ici !](https://discord.gg/MNtmkU9)/n" + 
        
      },
      {
        name: "A propos",
        value: "Je suis un bot créer par Müulsh#4627 !"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Slacker Company"
    }
  }
});

}
     





});

client.login(process.env.TOKEN);
