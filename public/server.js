const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public

app.set('view engine', 'ejs');  // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));  // Specify the views folder

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Application', 'index.html'));
});

// Guestbook route to serve guestbook.html and display messages
app.get('/guestbook', (req, res) => {
    fs.readFile('guestbookdata.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading messages.");

        const messages = JSON.parse(data);
        res.render('guestbook', { messages }); // Use EJS if needed, or serve guestbook.html directly
    });
});

// Serve newmesg.html
app.get('/newmessage', (req, res) => {
    res.sendFile(path.join(__dirname, 'Application', 'newmesg.html'));
});

// Handle new message submission
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
            res.redirect('/guestbook');
        });
    });
});

// Serve ajaxmessageform.html
app.get('/ajaxmessage', (req, res) => {
    res.sendFile(path.join(__dirname, 'Application', 'ajaxmessageform.html'));
});

// Handle AJAX message submission
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
            res.json(messages); // Send back the updated list of messages as JSON
        });
    });
});




// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
