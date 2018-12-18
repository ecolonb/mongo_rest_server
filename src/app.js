require('./server/config/config');
const Express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const apiRoutes = require('./routes/api').routes;
const { routes: apiRoutes } = require('./routes/api');
const { RoutesWeb: routesWeb } = require('./routes/web');

const app = new Express();
const port = process.env.PORT;

//Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Body parser -> Parsear a json formularios de entrada
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas web
app.use('/', routesWeb);
// Rutas de la api
app.use('/api/', apiRoutes);

// start BD -> Connect
//'mongodb://localhost:27017/test',
mongoose.connect(
  'mongodb://mongo_user:root123@ds153978.mlab.com:53978/mongo_test',
  (err, res) => {
    if (err) throw err;
    console.log('Datase => OK');
  }
);
// Server listener
app.listen(port, () => {
  console.log('Server on: http://localhost:' + port);
});
