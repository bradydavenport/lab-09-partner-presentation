'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');


module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Not Authorized');
  } else {
    let authStr = req.headers.authorization.split(' ')[1];
    let decodedAuthStr = base64.decode(authStr);
    let [username, password] = decodedAuthStr.split(':');
    console.log(username, password);
    let user = await users.authenticateBasic(username, password);

    if (user) {
      req.user = user;
      next();
    } else {
      next('Not Authorized');
    }
  }
};