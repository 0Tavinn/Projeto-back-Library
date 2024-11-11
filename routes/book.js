var express = require('express');
var ip = require('ip');
var os = require('os');
var router = express.Router();

var ModelBook = require('../model/ModelBook');

var _ModelBook = new ModelBook();


router.route('/')
  .get(function(req, res, next) {
    _ModelBook.getBook(null, null)
      .then(resultJSON => {
        res.status(200).json(resultJSON).end();
      })
      .catch(err => {
        console.error('Erro na requisição \`get\` para o recurso: ' + err);
        res.status(500).send(err).end();
      });
  })
  .post(function(req, res) {
    _ModelBook.postBook(req.body.titulo, req.body.autor, req.body.genero, parseInt(req.body.ano_publicacao, 10))
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
    _ModelBook.putBook(userId, req.body.titulo, req.body.autor, req.body.genero, parseInt(req.body.ano_publicacao, 10))
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
    _ModelBook.deleteBook(userId)
    .then(resultJSON => {
      res.status(202).json(resultJSON).end();
      
    })
    .catch(err => {
      console.error('Erro na requisição \`delete\` para o recurso: ' + err);
      res.status(500).send(err).end();
    });
  });

  module.exports = router;