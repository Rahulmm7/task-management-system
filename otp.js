const { totp } = require('otplib');


function main() {
    const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'
    const otp = totp.generate(secret);
    return otp
}

module.exports = main()

