const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use( express.static(path.join(__dirname, 'public')))

// Serve the home page with EJS
app.get('/', (req, res) => {
    res.render('index');
});

// Serve the guestbook page
app.get('/guestbook', (req, res) => {
    fs.readFile('guestbookdata.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading messages.");

        const messages = JSON.parse(data);
        res.render('guestbook', { messages }); // Render 'guestbook.ejs' with message data
    });
});

// Serve the new message form
app.get('/newmessage', (req, res) => {
    res.sendFile(path.join(__dirname, 'Application', 'newmesg.html')); // Serve 'newmesg.html'
});

// Handle new message submissions
app.post('/newmessage', (req, res) => {
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
            res.redirect('/guestbook'); // Redirect to the guestbook page
        });
    });
});

// Serve the Ajax message form
app.get('/ajaxmessage', (req, res) => {
    res.sendFile(path.join(__dirname, 'Application', 'ajaxmessageform.html')); // Serve 'ajaxmessageform.html'
});

// Handle Ajax message submissions
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
            res.json(messages); // Respond with updated messages as JSON for Ajax
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
