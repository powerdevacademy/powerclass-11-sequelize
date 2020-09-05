var express = require('express');
var router = express.Router();
const { User } = require('../models');

router.get('/', async function(req, res) {
  if(req.token.scopes.includes('Admin')) {

    try {
      const users = await User.findAll({attributes: ['id', 'name', 'username', 'scopeId']});
      res.json(users);
    } catch(e) {
      console.log('ERROR', e);
      res.status(500).json({error: "Deu ruim."});
    }
  } else {
    res.status(403).json({error: "Você não tem permissão pra isso!"});
  }
});

router.get('/:id', async function(req, res) {
  const { id } = req.params;

  if(!req.token.scopes.includes('Admin') && req.token.sub != req.params.id) {
    res.status(403).json({error: "Você não pode bisbilhotar os users alheios."})
  }

  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'name', 'username', 'scopeId'],
    raw: true
  });

  if(!user) {
    res.status(404).json({error: "Usuário inexistente"});
  }

  res.json(user);
});

router.post('/', async (req, res) => {
  const { body } = req;
  try{
    const user = await User.create({...body});
    res.json({message:"Usuário criado com sucesso", data: user});
  } catch(e) {
    res.status(500).json({error: "Deu ruim."});
  }

});

module.exports = router;
