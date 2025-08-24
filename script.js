// Horizontal highlights scrolling implementation
function horizontalScrollHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    let currentIndex = 0;

    function scrollToHighlight() {
        if (currentIndex < highlights.length) {
            highlights[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
            currentIndex++;
            setTimeout(scrollToHighlight, 2000); // Adjust time interval as needed
        } else {
            currentIndex = 0;
            setTimeout(scrollToHighlight, 2000);
        }
    }
    scrollToHighlight();
}

// Light/Dark mode toggle implementation
const toggleButton = document.getElementById('toggle-mode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const mode = document.body.classList.contains('dark-mode') ? 'Dark' : 'Light';
    toggleButton.textContent = `${mode} Mode`;
});

// Initialize
horizontalScrollHighlights();