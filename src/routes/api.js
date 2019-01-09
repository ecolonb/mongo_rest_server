const routes = require('express').Router();
const userController = require('../controller/user');
const categoryCotroller = require('../controller/category');
// Usuario
routes.post('/user/new', userController.newUser);
routes.get('/user/get/:id/:token', userController.getUser);
routes.get('/user/get/:search', userController.searchUser);
routes.put('/user/update/:id', userController.updateUser);
routes.delete('/user/delete/:id', userController.deleteUSer);
// Categories
routes.post('/category/new/:id/:token', categoryCotroller.newCategory);
routes.get('/get_categories/:target', categoryCotroller.getCategories);
routes.get('/get_category/:id', categoryCotroller.getCategory);

//Others
routes.post('/category/new', categoryCotroller.newCategory);

module.exports = {
  routes
};
