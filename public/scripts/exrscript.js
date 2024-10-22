const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the webpage' });
});

app.get('/guestbook', (req, res) => {
    res.json({ message: 'This is the guestbook' });
});

app.get('/newmessage', (req, res) => {
    res.json({ message: 'Here are all the new messages' });
});

app.get('/ajaxmessage', (req, res) => {
    res.json({ message: 'You can input a new message here' });
});