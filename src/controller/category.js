// Modelos
const Category = require('../models/category');

const newCategory = (req, res) => {
  const body = req.body;
  console.log('body new category data: => ', body);
  // console.log('req=>', req);
  const category = new Category({
    name: body.name,
    description: body.description
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
  getCategories
};
