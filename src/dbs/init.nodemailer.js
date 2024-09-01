'use strict'

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: 'email-smtp.ap-southeast-1.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
        user: 'AKIAU6GDXVN4MVW7M7UD', //'AKIA4SW7WGZBCLIDGPGC',
        pass: 'BMHg07ykI8kZafSfJNRU5blCko+JdDnXfzSG2qWbSskD',//'BK9TllDhe+6nBtD27dpJSAM+gTTL+vJ2imrVS+OqfLYk'
    }
})

module.exports = transport