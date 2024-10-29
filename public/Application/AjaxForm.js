document.getElementById('Ajax-Form').addEventListener('submit', function (event) {
    event.preventDefault();

    const messageData = {
        name: document.getElementById('name').value,
        country: document.getElementById('country').value,
        message: document.getElementById('message').value,
    };

    fetch('/ajaxmessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(messages => {
        document.getElementById('messageList').innerHTML = messages.map(msg => `
            <div>
                <h3>${msg.name} from ${msg.country}</h3>
                <p>${msg.message}</p>
                <small>${new Date(msg.timestamp).toLocaleString()}</small>
            </div>
        `).join('');
    });
});
