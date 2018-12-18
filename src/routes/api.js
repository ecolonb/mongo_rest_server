const routes = require('express').Router();
const userController = require('../controller/user');
const categoryCotroller = require('../controller/category');
// Usuario
routes.post('/user/new', userController.new_user);
routes.get('/user/get/:id/:token', userController.get_user);
routes.put('/user/update/:id', userController.update_user);
// Categories
routes.post('/category/new', categoryCotroller.newCategory);
routes.get('/get_category/:target', categoryCotroller.getCategories);

module.exports = {
  routes
};
