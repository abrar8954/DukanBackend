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
    console.log('req.body.tokens: ', req.body.tokens)
    


    const message = {
        data: {
            title: 'Hi there',
            body: 'This message was sent via FCM!',
            largeIcon: 'https://firebasestorage.googleapis.com/v0/b/dukanfiba.appspot.com/o/images%2FshopImages%2F-NWDYgcOggK8JILReyRt?alt=media&token=58ede0d3-7b8a-4e51-8228-fd35660bc49e',
        },
        tokens: req.body.tokens

    }

    admin.messaging().send(message).then(res => {
        console.log('send success')
    }).catch(err => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log('server running')
})