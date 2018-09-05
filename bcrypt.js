const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

module.exports.hashPass = function(password) {
    return genSalt().then(salt => {
        console.log(password, 'inside check hash');
        return hash(password, salt);
    });
};

module.exports.checkPass = function(pass, hash) {
    console.log(pass, 'inside check pass');

    return compare(pass, hash);
};
