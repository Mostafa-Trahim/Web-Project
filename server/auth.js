const {sign, verify} = require('jsonwebtoken');

const SECRET_JWT_KEY = 'my_secret'


//function createtoken
const createToken = (username) => {
    const accessToken = sign({username: username}, SECRET_JWT_KEY,{
        expiresIn: '1d'
    });
    return accessToken;
}   

exports.createToken = createToken;