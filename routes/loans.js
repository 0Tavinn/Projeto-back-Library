var express = require('express');
var ip = require('ip');
var os = require('os');
var router = express.Router();

var ModelLoans = require('../model/ModelLoans');

var _ModelLoans = new ModelLoans();

// Formata as datas no formato "DD/MM/AAAA"
const formatarData = (data) => {
  const dia = String(data.getDate()).padStart(2, '0'); // Se o dia tiver apenas um dígito (por exemplo, "5"), padStart(2, '0') adiciona um zero à esquerda, tornando "05".
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são indexados a partir de 0
  const ano = data.getFullYear();
  const myHour = data.getHours();
  const myMinute = data.getMinutes();
  const mySecond = data.getSeconds();
  return `${dia}/${mes}/${ano} ${myHour}:${myMinute}:${mySecond}`;
}
router.route('/')
  .get(function (req, res, next) {
    _ModelLoans.getLoans(null, null)
      .then(resultJSON => {
        res.status(200).json(resultJSON).end();
      })
      .catch(err => {
        console.error('Erro na requisição \`get\` para o recurso: ' + err);
        res.status(500).send(err).end();
      });
  })
  .post(function (req, res) {
    const dataEmprestimo = new Date();
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataEmprestimo.getDate() + 25); // Adiciona 25 dias
    const dataEmprestimoFormatted = formatarData(dataEmprestimo)
    const dataDevolucaoFormatted = formatarData(dataDevolucao)
    // Aqui estamos criando o empréstimo com os dados corretos
    _ModelLoans.postLoans(req.body.livro_idlivro, req.body.usuario_idusuario, dataEmprestimoFormatted, dataDevolucaoFormatted)
      .then(resultJSON => {
        res.status(201).json(resultJSON).end();
        
      })
      .catch(err => {
        console.error('Erro na requisição \`post\` para o recurso: ' + err);
        res.status(400).json({ error: err.message }).end();
      });
  })
router.put('/devolver/:id', function (req, res) {
  const emprestimoId = req.params.id;
  const data_devolucao = new Date();
  const dataDevolucaoFormatted = formatarData(data_devolucao) // Data da devolução no momento do retorno
  
  _ModelLoans.putLoans(emprestimoId, dataDevolucaoFormatted)
    .then(resultJSON => {
      res.status(200).json(resultJSON).end();
      
    })
    .catch(err => {
      console.error('Erro na requisição \`put\` para o recurso: ' + err);
      res.status(500).send(err).end();
    });
})
router.delete('/:id', (req, res) => {
  const emprestimoId = req.params.id;
  _ModelLoans.deleteLoans(emprestimoId)
    .then(resultJSON => {
      res.status(202).json(resultJSON).end();
      
    })
    .catch(err => {
      console.error('Erro na requisição \`delete\` para o recurso: ' + err);
      res.status(500).send(err).end();
    });
});
router.get('/relatorio', async (req, res) => {
  try {
    const resultJSON = await _ModelLoans.getBooksAndUsersReports();
    res.status(200).json(resultJSON).end();
  } catch (err) {
    console.error('Erro ao gerar o relatório combinado:', err);
    res.status(500).json({ error: err.message }).end();
  }
});
module.exports = router;
// Formata as datas no formato "DD/MM/AAAA"
/*const formatarData = (data) => {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são indexados a partir de 0
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const dataEmprestimoFormatted = formatarData(dataEmprestimo);
const dataDevolucaoFormatted = formatarData(dataDevolucao);*/