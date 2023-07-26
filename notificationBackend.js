const admin = require('firebase-admin')
const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000

// var serviceAccount = require("./dukanfiba-firebase-adminsdk-6rokc-9935e69409.json");
var serviceAccount = {
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key,
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url,
    "universe_domain": process.env.universe_domain

};

app.use(express.json())
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.post('/send-noti', (req, res) => {
    console.log('req.body: ', req.body)

    const message = {
        data: {
            title: req.body.name,
            body: req.body.msg,
            largeIcon: req.body.image,
        },
        tokens: [req.body.token]

    }

    admin.messaging().sendMulticast(message).then(res => {
        console.log('send success')
    }).catch(err => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log('server running')
})