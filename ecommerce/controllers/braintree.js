const User = require('../models/user');
const braintree = require('braintree')
require('dotenv').config()
//BRAINTREE_MERCHANT_ID=vny23bmw63fcxswy
//BRAINTREE_PUBLIC_KEY=jd3cnhctxwkh6zrs
//BRAINTREE_PRIVATE_KEY=8d28c4e033e092e1fe1b3a7d3773b793

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY

})
exports.generateToken = (req , res) => {

    gateway.clientToken.generate({}, function(err, response) {
        if(err) {
            res.status(500).send(err);

        }else{
            res.send(response);
        }
    })
}

exports.processPayment = (req , res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    let newTransaction = gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (error , result) => {
            if(error){
                res.status(500).json(error)
            }else {
                res.json(result)
            }
    })
}