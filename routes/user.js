var express = require('express');
var ip = require('ip');
var os = require('os');
var router = express.Router();

var ModelUser = require('../model/ModelUser');

var _ModelUser = new ModelUser();


router.route('/')
  .get(function(req, res, next) {
    _ModelUser.getUsuario(null, null)
      .then(resultJSON => {
        res.status(200).json(resultJSON).end();
      })
      .catch(err => {
        console.error('Erro na requisição \`get\` para o recurso: ' + err);
        res.status(500).send(err).end();
      });
  })
  .post(function(req, res) {
    _ModelUser.postUsuario(req.body.nome, req.body.endereco, req.body.email, req.body.telefone)
      .then(resultJSON => {
        res.status(201).json(resultJSON).end();
        
      })
      .catch(err => {
        console.error('Erro na requisição \`post\` para o recurso: ' + err);
        res.status(500).send(err).end();
      });
  })
  router.put('/:id',function(req, res) {
    const userId = req.params.id;
    _ModelUser.putUsuario(userId, req.body.nome, req.body.endereco, req.body.email, req.body.telefone)
    .then(resultJSON => {
      res.status(200).json(resultJSON).end();
      
    })
    .catch(err => {
      console.error('Erro na requisição \`put\` para o recurso: ' + err);
      res.status(500).send(err).end();
    });
  })
  router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    _ModelUser.deleteUsuario(userId)
    .then(resultJSON => {
      res.status(202).json(resultJSON).end();
      
    })
    .catch(err => {
      console.error('Erro na requisição \`delete\` para o recurso: ' + err);
      res.status(500).send(err).end();
    });
  });

  module.exports = router;