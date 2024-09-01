'use strict'

const htmlEmailToken = () => {
    // return `<a href="{{link_verify}}"></a>`
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to [Your Company Name]!</h1>
        <p>Hello [User's Name],</p>
        <p>Thank you for signing up. To complete your registration and verify your email address, please click the button below:</p>
        <p><a href="{{link_verify}}" class="button">Verify Email Address</a></p>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p>[link_verify]</p>
        <p>This link will expire in 24 hours for security reasons.</p>
        <p>If you didn't create an account with us, please disregard this email.</p>
        <p>Best regards,<br>[Your Name/Company Name] Team</p>
    </div>
</body>
</html>`
}

module.exports = {
    htmlEmailToken
}