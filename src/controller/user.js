const bc = require('bcrypt');
const User = require('../models/user');
const new_user = (req, res) => {
  const body = req.body;
  console.log(
    'bc.hashSync(body.password, 10)=> ',
    bc.hashSync(body.password, 10)
  );
  const user = new User({
    name: body.nombre,
    lastname: body.apellidos,
    email: body.email,
    password: bc.hashSync(body.password, 10),
    role: body.rol,
    description: body.descripcion
  });

  user.save((err, userBd) => {
    if (err) {
      const response_data = {
        err: true,
        res: err
      };
      return res.status(400).json(response_data);
    }
    userBd.password = null;
    const response_data = {
      err: false,
      res: userBd
    };
    return res.status(200).json(response_data);
  });
};

const get_user = (req, res) => {
  // const id = req.query.id;
  const id = req.params.id;
  const token = req.params.token;
  let response_data = {
    id: 0,
    token: '--------bad----token-----',
    response: null
  };
  User.findById(id, (err, result) => {
    if (err) {
      //   console.log('If error=>', err);
      response_data.message = err;
      return res.status(400).json(response_data);
    }
    if (result != undefined && result != null) {
      response_data = {
        id: 1368,
        response: result,
        message: 'ok'
      };
    } else {
      response_data = {
        id: 0,
        response: null,
        message: 'sin resultados'
      };
    }

    console.log('Response: ', response_data);
    return res.status(200).json(response_data);
  });
};

const update_user = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  console.log(id);
  console.log(body);
  User.findByIdAndUpdate(
    id,
    body,
    { runValidators: true, context: 'query' },
    (reject_msg, result) => {
      if (reject_msg) {
        return res.status(400).json({
          err: true,
          message: reject_msg
        });
      }
      return res.status(200).json({
        err_: false,
        message: result
      });
    }
  ).catch(err__ => {
    console.log('Error: ', err__);
  });
};

module.exports = {
  new_user,
  get_user,
  update_user
};
