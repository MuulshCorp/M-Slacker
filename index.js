const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
require("opusscript");
const config = require("./data/config.json");

client.on("ready", () => {
  console.log('BUI IS THE BEST BOT EVER');
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
    description: "Voici les stats du serveur !",
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
    description: "Voici les stats du serveur !",
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

let points = JSON.parse(fs.readFileSync('./data/levels.json', 'utf8'));
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(!points[message.author.id]) points[message.author.id] = {points: 0, level: 0};
	let userData = points[message.author.id];
	userData.points++;
	let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
if(curLevel > userData.level) {
	userData.level = curLevel;
	message.reply(`Vous êtes passer niveau **${curLevel}** bravo !`);
}
if(command === "levels") {
	message.reply(`Vous êtes niveau ${userData.level}, et vous avez ${userData.points} expériences.`);
}
	fs.writeFile('./data/levels.json', JSON.stringify(points), (err) => {if(err) console.error(err)});
 

if (!message.content.startsWith(config.prefix) || message.author.bot) return;
if(message.content.indexOf(config.prefix) !== 0) return;
  

if (command === "bui") {
	message.channel.send('BUI IS THE BEST BOT EVER')};


if (command === "help") {
message.channel.send({embed: {
    color: 3447003,
    title: `Hey ${message.author.username} ! Bui aide actuellement ${client.guilds.size} serveurs !`,
    description: "Hey ! Voici les liens utiles !",
    fields: [
      {
        name: "Pré-requis",
        value: 'Un salon pour le message de Bienvenue : "accueil" \n' +
        'Un rôle pour les Administrateurs (purge/kick/ban) : "Administrateur" \n' +
        'Un rôle pour les Modérateurs (purge/kick) : "Modérateur"'
      },
      {
        name: "Les Commandes",
        value: config.prefix+"ping : pour connaitre la latence \n" + 
        config.prefix+"say : pour faire parler le bot \n" + 
        config.prefix+"levels : pour voir vos niveaux ! \n" +  
        config.prefix+"purge : pour supprimer des messages de 2 à 150 messages \n" + 
        config.prefix+"kick : pour expulser des personnes \n" + 
        config.prefix+"ban : pour bannir des personnes \n" +
        config.prefix+"avatar : pour voir son avatar \n" +
        config.prefix+"stats : pour connaitre les statistiques du bot"
      },
      {
        name: "Invitation",
        value: `Tu souhaite m'inviter sur un autre serveur ? Voici l'invit : [Clique ici](https://discordapp.com/api/oauth2/authorize?client_id=472890999551557632&permissions=1341652039&scope=bot)`
      },
      {
        name: "Serveurs",
        value: "Tu souhaite rejoindre le serveur de la Slacker Company ? [C'est ici !](https://discord.gg/MNtmkU9)\n" + 
        "Tu souhaite rejoindre le serveur de DevAll ? [C'est par la !](https://discord.gg/JNNeb4B)\n"
      },
      {
        name: "A propos",
        value: "Je suis un bot créé par Müulsh#4726 !"
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

if (command === 'avatar') {
    message.reply(message.author.avatarURL);
  }



if(command === "purge") {
  if(!message.member.roles.some(r=>["Administrateur", "Modérateur", "ADMINISTRATEUR", "MODO"].includes(r.name)) )
      return message.reply('Tu a les permissions pour utiliser cette commande ? Tu a le grade "Administrateur" ou  "Modérateur" ?');
    
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 150)
      return message.reply("Vous devez donner un nombre entre 2 et 150");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Je ne peux pas effacer les messages car : ${error}`));
  }


if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }


if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! La latence est de ${m.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est de ${Math.round(client.ping)}ms`);
  }

if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrateur", "Modérateur", "ADMINISTRATEUR", "MODO"].includes(r.name)) )
      return message.reply('Tu a les permissions pour utiliser cette commande ? Tu a le grade "Administrateur" ou  "Modérateur" ?');
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Tu dois mentionner un personne valide !");
    if(!member.kickable) 
      return message.reply("Je peut pas expulser cette personne ! Elle a un rang plus haut que le mien ? J'ai la permission de kick ?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison choisit";
    
    await member.kick(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je peut pas expulser cette personne car : ${error}`));
    message.reply(`${member.user.tag} a été expulser par ${message.author.tag} car : ${reason}`);

  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrateur", "ADMINISTRATEUR"].includes(r.name)) )
      return message.reply('Tu a les permissions pour utiliser cette commande ? Tu a le grade "Administrateur" ?');
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Tu dois mentionner un personne valide !");
    if(!member.bannable) 
      return message.reply("Je peut pas bannir cette personne ! Elle a un rang plus haut que le mien ? J'ai la permission de bannir ?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison choisit";
    
    await member.ban(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je peut pas bannir cette personne car : ${error}`));
    message.reply(`${member.user.tag} a été banni par ${message.author.tag} car: ${reason}`);
  }



});

client.login(process.env.TOKEN);