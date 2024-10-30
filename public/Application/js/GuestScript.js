fetch('/guestbookdata.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched data:", data);  // Should show your JSON data if successful
        const entries = document.getElementById('guestbook-entries');
        entries.innerHTML = '';  // Clear any existing content

        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.username}</td>
                <td>${entry.country}</td>
                <td>${entry.message}</td>
            `;
            entries.appendChild(row);
        });
    })
    .catch(error => console.error("Error fetching guestbook entries:", error));
