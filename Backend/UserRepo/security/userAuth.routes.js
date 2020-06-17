const userAuth = require('./authUser.controller');
const auth = require('./middlewareAuth')
module.exports = (router) => {
  router.post('/registerUserAuth', userAuth.createUser);
  router.post('/getUserAuthById', auth, userAuth.getUserById);
  router.get('/getUserAuthByEmail/:email', userAuth.getUserByEmail);
  router.get('/getUsersAuth', userAuth.getUsersInformation);
  router.put('/updateUserAuth/:id', auth, userAuth.updateUserAuthInformation);
  router.post('/deleteUserAuth', auth, userAuth.deleteUser);
  router.post('/login', userAuth.login);
  router.post('/logout', auth, userAuth.logout);
  router.get('/googleLogin/:email', userAuth.googleLogin);
}
