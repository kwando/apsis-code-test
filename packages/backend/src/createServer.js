const express = require('express');

const bodyParser = require('body-parser');
const playGame = require('./playGame');

module.exports = function createServer(){
  const app = express();
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.get('/api/version', (req, res) => {
    res.send('bowling score server 0.0.1')
  });
  
  app.post('/api/score', (req, res)=>{
    const { error, score } = playGame(req.body);
    if(error){
      res.send({ error });
    }else{
      res.send({ score });
    }
  });

  return app;
}