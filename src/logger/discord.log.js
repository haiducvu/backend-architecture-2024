'use strict'

const { Client, GatewayIntentBits } = require('discord.js')
// const client = new Client({
//     intents: [
//         GatewayIntentBits.DirectMessages,
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.MessageContent
//     ]
// })

// client.on('ready', () => {
//     console.log(`Logged is as ${client.user.tag}`)
// })

// const token = 'MTIxNjI5OTA1NDk0Njk3OTg5MQ.GUftEa.OIk81H_8JCVUE8v7ZoQem2Qn2C3xE_RC0yW9fI'

// client.login(token);

// client.on('messageCreate', msg => {
//     if(msg.author.bot) return;
//     if(msg.content === 'hello') {
//         msg.reply(`Hai ha?`)
//     }
// })

class LoggerService {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        })
    }
}

module.exports = new LoggerService()