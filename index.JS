const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    fs = require('fs')
 
client.login(process.env.TOKEN)
client.commands = new Discord.Collection()
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})
 
client.on ( 'guildMemberAdd' , membre =>  {
    membre. guilde . canaux . cache . get ( config. salutation . canal ) . send ( `$ { membre } a rejoint le serveur. Nous sommes désormais $ { membre. guild . memberCount }  ! 🎉` )
    membre. rôles . add ( config. salutation . rôle )
} )
 
client.on ( 'guildMemberRemove' , membre =>  {
    membre. guilde . canaux . cache . get ( config. salutation . canal ) . send ( `$ { membre. utilisateur . tag } a quitté le serveur ... 😢` )
} )
 