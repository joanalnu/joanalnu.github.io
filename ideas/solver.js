function checkPuzzle() {
    const guess = document.getElementById('guess').value;
    const feedback = document.getElementById('feedback');
    const solution = document.getElementById('solution');

    if (guess === "correct") {
        feedback.innerHTML = "✓ Correct";
        feedback.style.color = "var(--accent)";
        solution.style.display = "block";
    } else {
        feedback.innerHTML = "✗ Hay una falla en tu razonamiento. Inténtalo de nuevo.\nThere is a mistake in your reasoning. Try again.";
        feedback.style.color = "var(--text-secondary)";
        solution.style.display = "none";
    }
}
