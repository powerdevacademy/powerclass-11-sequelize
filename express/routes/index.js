var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const constants = require('../constants');
const moment = require('moment');
const { User, Scope } = require('../models'); 

router.get('/', (req, res) => {
  res.json({
    message: "Bem vindo à POWERCLASS #10"
  });
});

router.post('/login', async (req, res) => {
  const { body } = req;

  const password = User.generateHash(body.senha);
  const user = await User.findOne({
    where: {
      username: body.usuario, 
      password: password
    },
    include: {
      model: Scope,
      attributes: ['name']
    },
    raw: true,
    nest: true
  });

  if (user) {
    
    const stdClaims = {
      iss: "http://meuservidorseguro.com.br",
      aud: "some_app_id",
      sub: user.id,
      exp: moment().add(2, 'hours').unix()
    };

    const userClaims = {
      username: user.username,
      name: user.name,
      // email: "daniel@icarusacademy.com.br",
      scopes: [user['Scope'].name]
    }

    const token = jwt.sign({ ...stdClaims, ...userClaims }, constants.SERVER_KEY);
    res.json({ token })
  } else {
    res.status(401).json({error: "Credenciais Inválidas"});
  }


});

module.exports = router;
