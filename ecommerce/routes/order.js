const express = require('express');
const router = express.Router();
const {
    requireSignin, 
    isAuth,
    isAdmin
}= require('../controllers/auth');
const { 
    userById , addOrderToUserHistory 
}= require('../controllers/user');

const { 
    create,
    listOrders,
    getStatusValues,
    updateOrderStatus,
    orderById
}= require('../controllers/order');

router.get('/order/list/:userId', requireSignin , isAuth , isAdmin , listOrders)

router.post('/order/create/:userId', requireSignin , isAuth , addOrderToUserHistory,  create)

router.get('/order/status-values/:userId', requireSignin , isAuth , isAdmin , getStatusValues)

router.put('/order/:orderId/status/:userId', requireSignin , isAuth , isAdmin , updateOrderStatus)





router.param("orderId" , orderById);

router.param("userId" , userById);
module.exports = router;