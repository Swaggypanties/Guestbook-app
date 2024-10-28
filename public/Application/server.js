const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Root route to serve home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

// Guestbook route to display messages
app.get('/guestbook', (req, res) => {
    fs.readFile('guestbookdata.json', 'utf8', (err, data) => {
        const messages = JSON.parse(data);
        res.render('guestbook', { messages });
    });
});

// New message form route
app.get('/newmessage', (req, res) => {
    res.sendFile(path.join(__dirname + 'newmessage.html'));
});

// Handle form submission for new message
app.post('/newmessage', (req, res) => {
    const newMessage = {
        username: req.body.username,
        country: req.body.country,
        message: req.body.message,
        timestamp: new Date()
    };

    fs.readFile('guestbookdata.json', 'utf8', (err, data) => {
        messages.push(newMessage);

        fs.writeFile('guestbookdata.json', JSON.stringify(messages), (err) => {
            res.redirect('/guestbook');
        });
    });
});

// AJAX form route to display form and submit via AJAX
app.get('/ajaxmessage', (req, res) => {
    res.sendFile(path.join(__dirname + 'ajaxmessage.html'));
});

// Handle AJAX submission and send back messages
app.post('/ajaxmessage', (req, res) => {
    const newMessage = {
        username: req.body.username,
        country: req.body.country,
        message: req.body.message,
        timestamp: new Date()
    };

    fs.readFile('guestbookdata.json', 'utf8', (err, data) => {
        const messages = err ? [] : JSON.parse(data);
        messages.push(newMessage);

        fs.writeFile('guestbookdata.json', JSON.stringify(messages), (err) => {
            if (err) return res.status(500).send("Error saving message.");
            res.json(messages);
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
