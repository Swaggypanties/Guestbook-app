const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile( __dirname + '/newmesg.html');
});

app.get('/guestbook', (req, res) => {
    res.json({ message: 'This is the guestbook' });
});

app.get('/newmessage', (req, res) => {
    res.sendFile( __dirname + '/public/Application/newmesg.html');
});

app.get('/ajaxmessage', (req, res) => {
    res.json({ message: 'You can input a new message here' });
});

app.listen(3000, () => {
    console.log('Server is running in port 3000');
});