// Modelos
const Category = require('../models/category');
const User = require('../models/user');
async function getUser(id) {
  let result = await User.findById('5c191e9a345c229a60ad98c3');
  return result;
  // expected output: 'resolved'
}
const newCategory = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const UserDB = await getUser(id);
  //const token = req.params.token;
  //Primero se busca el usuario que crea la category
  const category = new Category({
    name: body.name,
    description: body.description,
    user: UserDB
  });
  category.save((err, categoryData) => {
    if (err) {
      const response = {
        err: true,
        message: err
      };
      return res.status(400).json(response);
    } else {
      let response = {
        err: false,
        message: categoryData
      };
      res.status(200).json(response);
    }
  });
};
const newCategoryPromise = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const res__ = await asyncCall();
  console.log('res__: ----->>>>', res__);
  //const token = req.params.token;
  //Primero se busca el usuario que crea la category
  getUserPromise(id)
    .then(user => {
      //Cuando se resuelve la promesa se obtiene el usuario entonces se crea la nueva categoria
      const category = new Category({
        name: body.name,
        description: body.description,
        user
      });
      category.save((err, categoryData) => {
        if (err) {
          const response = {
            err: true,
            message: err
          };
          return res.status(400).json(response);
        } else {
          let response = {
            err: false,
            message: categoryData
          };
          res.status(200).json(response);
        }
      });
    })
    .catch(err => {
      return res
        .status(400)
        .json({ err_: true, msg: 'No se encontro el usuario...' });
    });
};
const getCategory = (req, res) => {
  const id = req.params.id;
  Category.findById(id)
    .populate('user')
    .exec((err, category) => {
      if (err) {
        const response = {
          err: true,
          message: err
        };
        return res.status(400).json(response);
      } else {
        category.user.password = null;
        let response = {
          err: false,
          message: category
        };
        return res.status(200).json(response);
      }
    });
};
const getUserPromise = id => {
  const UserPromise = new Promise((resolve, reject) => {
    User.findById(id, (err, UsuarioDB) => {
      if (err) {
        reject(err);
      } else {
        resolve(UsuarioDB);
      }
    });
  });
  return UserPromise;
};
/***** Funcion para buscar categorias */
const getCategories = (req, res) => {
  const search = req.params.target;
  console.log('Get list of categories: ', search);
  if (search.trim() !== '' && search !== undefined) {
    let categories = null;
    if (search.trim().toLowerCase() == 'all') {
      categories = {
        err: false,
        name: 'High Tech',
        description: 'The best of thecnologies',
        id: 1231232321,
        search
      };
    } else if (
      search.trim().toLowerCase() == 'edgar' ||
      search.trim().toLowerCase() == 'edd'
    ) {
      categories = {
        id: 2786136821345589,
        name: 'Edgar Colón',
        description: 'He is a software engineer, web developer!'
      };
    }
    if (categories !== null) {
      return res.status(200).json(categories);
    } else {
      res.status(200).json({
        err: 'false',
        message: 'No se encontraron resultados!'
      });
    }
  } else {
    res.status(400).json({
      err: 'true',
      message: 'No se recibió el parametro de busqueda!'
    });
  }
};

module.exports = {
  newCategory,
  getCategories,
  getCategory
};
