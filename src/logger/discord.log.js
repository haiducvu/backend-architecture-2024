'use strict'

const { Client, GatewayIntentBits } = require('discord.js')
const { CHANNEL_DISCORD, TOKEN_DISCORD} = process.env

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

        // add channelId
        this.channelId = CHANNEL_DISCORD

        this.client.on('ready', () => {
            console.log(`Logged is as ${this.client.user.tag}`)
        })

        this.client.login(TOKEN_DISCORD)
    }

    sendToFormatCode(logData) {
        const { code, message = 'This is some additional information about the code.', title = 'Code example'} = logData;

        if( 1 === 1) { // product and dev

        }

        const codeMessage = {
            content: message,
            embeds: [
                {
                    color: parseInt('00ff00', 16), // Convert hexadecimal color code to integer
                    title,
                    description: '```json\n' + JSON.stringify(code, null, 2) + '\n```',
                }
            ]
        }

        this.sendToMessage(codeMessage)
    }

    sendToMessage(message = 'message') {
        const channel = this.client.channels.cache.get(this.channelId)
        if(!channel) {
            console.error(`Can't find the channel ...`, this.channelId)
            return
        }
        // message use CHAT GPT API CALL
        channel.send(message).catch(e => console.error(e))
    }
}

const loggerService = new LoggerService();

module.exports = new LoggerService(); //loggerServices