function loadHeader() {
    fetch('https://dobb1000.github.io/ITLernen/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}

loadHeader();
