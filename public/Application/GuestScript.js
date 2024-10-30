fetch('/guestbookdata.json')
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
    .then(data => {
        const entries = document.getElementById('guestbook-entries');
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