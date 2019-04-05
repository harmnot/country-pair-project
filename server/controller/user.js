const axios = require("axios");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('../model/user')
var jwt = require('jsonwebtoken');

class UserController {
  static signInGoogle(req, res) {
    let payload = null
    console.log('sign in google')
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload();
        return User.findOne({ email: payload.email })
      })
      .then(user => {
        if(!user) {
          console.log('ini di if')
          return User.create({
            email: payload.email,
            name: payload.name
          })
        } else {
          console.log('ini di else')
          let obj = {
            email: payload.email,
            name: payload.name
          }
          let token = jwt.sign(obj, 'okok')
          res.status(200).json(token)
        }
      })
      .then(() => {
        let token = jwt.sign({
          email: payload.email,
          name: payload.name
        }, process.env.SECRET_KEY)
        res.status(201).json(token)
      })
      .catch(err => {
        console.log('ini dari error')
        res.status(500).json(err)
        console.log(err)
      })
  }
}

module.exports = UserController