const bc = require('bcrypt');
const User = require('../models/user');
const _ = require('underscore');
const newUser = (req, res) => {
  const body = req.body;
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

const getUser = (req, res) => {
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

const updateUser = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  User.findByIdAndUpdate(
    id,
    body,
    { runValidators: true, context: 'query', new: true },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          err: true,
          message: err
        });
      }
      const result_pick = _.pick(result, ['name', 'lastname', 'email']);
      return res.status(200).json({
        err_: false,
        message: result_pick
      });
    }
  ).catch(err__ => {
    console.log('Error: ', err__);
  });
};

const searchUser = (req, res) => {
  const searcValue = {
    name: new RegExp(req.params.search),
    status: true
  };
  User.find(searcValue, 'name lastname email status')
    .skip(0)
    .limit(15)
    .exec((err, result) => {
      if (err) {
        const response = {
          err: true,
          msg: err
        };
        console.log('response: ', response);
        return res.status(400).json(response);
      }
      const response = {
        err: false,
        msg: result
      };
      console.log('response: ', response);
      return res.status(200).json(response);
    });
};
const deleteUSer = (req, res) => {
  const cambiaEstado = {
    status: false
  };
  const id = req.params.id;
  User.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, result) => {
    if (err) {
      const response = {
        err: true,
        msg: result
      };
      return res.status(400).json(response);
    }
    const resultPick = _.pick(result, ['name', 'lastname', 'email', 'status']);
    const response = {
      err: false,
      msg: resultPick
    };
    return res.status(200).json(response);
  });
};
module.exports = {
  newUser,
  getUser,
  updateUser,
  searchUser,
  deleteUSer
};
