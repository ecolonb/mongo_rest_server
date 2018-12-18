const RoutesWeb = require('express').Router();

RoutesWeb.get('/', (req, res) => {
  res.send('<h1>Api rest NodeJs => { Hola mundo! }</h1>');
});
RoutesWeb.get('/hello', (req, res) => {
  res.send('<h1>Hello => { Hola mundo! }</h1>');
});
module.exports = {
  RoutesWeb
};
