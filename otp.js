const { totp } = require('otplib');
require('dotenv').config()
const secretString = process.env.OTP_STRING

function main() {
    const secret = secretString
    const otp = totp.generate(secret);
    return otp
}

module.exports = main()

