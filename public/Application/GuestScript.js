 // Fetch guestbook entries and display them
 fetch('/guestbookdata')
 .then(response => response.json())
 .then(messages => {
     const entriesContainer = document.getElementById('guestbook-entries');
     messages.forEach(message => {
         const row = document.createElement('tr');
         row.innerHTML = `
             <td>${message.username}</td>
             <td>${message.country}</td>
             <td>${message.message}</td>
             <td>${new Date(message.timestamp).toLocaleString()}</td>
         `;
         entriesContainer.appendChild(row);
     });
 });