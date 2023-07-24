const admin = require('firebase-admin')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var serviceAccount = require("./dukanfiba-firebase-adminsdk-6rokc-9935e69409.json");
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
        tokens: req.body.token

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