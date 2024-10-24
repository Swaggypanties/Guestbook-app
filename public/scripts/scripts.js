document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the sumbission of a default form

    const formData = {
        name: document.getElementById('name').value,
        country: document.getElementById('country').value,
        message: document.getElementById('message').value
    };

    // Use fetch to send the data to the backend (Express)
    fetch('/adduser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Message saved successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});