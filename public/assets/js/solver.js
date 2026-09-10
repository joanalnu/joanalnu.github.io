function checkPuzzle(correctValue, successMessage, failureMessage) {
    const guess = document.getElementById('guess').value;
    const feedback = document.getElementById('feedback');
    const solution = document.getElementById('solution');

    if (guess === correctValue) {
        feedback.innerHTML = `✓ ${successMessage}`;
        feedback.style.color = "var(--accent-color)";
        solution.style.display = "block";
    } else {
        feedback.innerHTML = `✗ ${failureMessage}`;
        feedback.style.color = "var(--text-muted)";
        solution.style.display = "none";
    }
}
