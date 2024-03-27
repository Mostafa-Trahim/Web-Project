const {sign, verify} = require('jsonwebtoken');
const { createToken } = require('./auth.js');

const SECRET_JWT_KEY = 'Vu1NK2P9v7TwhWaEpjQS'


//function createtoken
const createToken = (username) => {
    const accessToken = sign({username: username}, SECRET_JWT_KEY,{
        expiresIn: '1d'
    });
    return accessToken;
}   

exports.createToken = createToken;