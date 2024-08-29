/// Handle Google search or direct URL navigation
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    
    if (query) {
        if (query.startsWith('http://') || query.startsWith('https://') || query.includes('.')) {
            // Navigate to URL
            window.location.href = query.startsWith('http') ? query : `https://${query}`;
        } else {
            // Google search
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
});

// Handle shortcut clicks
document.querySelectorAll('.shortcut').forEach(shortcut => {
    shortcut.addEventListener('click', function() {
        window.location.href = this.getAttribute('data-url');
    });
});

// Add shortcut functionality
document.getElementById('addShortcutButton').addEventListener('click', function() {
    const url = prompt('Enter the URL for the new shortcut:');
    const name = prompt('Enter a name for the new shortcut:');
    const iconUrl = `${url}/favicon.ico`; // Fallback for favicon

    if (url && name) {
        const shortcutsContainer = document.getElementById('shortcutsContainer');

        // Create new shortcut element
        const shortcutDiv = document.createElement('div');
        shortcutDiv.className = 'shortcut';
        shortcutDiv.setAttribute('data-url', url);

        const img = document.createElement('img');
        img.src = iconUrl;
        img.alt = 'Shortcut Icon';

        const p = document.createElement('p');
        p.textContent = name;

        shortcutDiv.appendChild(img);
        shortcutDiv.appendChild(p);

        // Add event listener for navigation
        shortcutDiv.addEventListener('click', function() {
            window.location.href = url;
        });

        // Append to the shortcuts container
        shortcutsContainer.appendChild(shortcutDiv);
    }
});
