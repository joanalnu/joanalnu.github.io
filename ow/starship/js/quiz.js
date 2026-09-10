/**
 * Space Math Academy - Simple Answer Verification
 * (Static-site friendly, zero-state telemetry)
 */
function checkAnswer(button) {
    // Find parent problem container
    const container = button.closest(".problem-box");
    if (!container) return;

    // Get input and target answer values
    const inputElement = container.querySelector(".answer");
    const resultElement = container.querySelector(".result");
    if (!inputElement || !resultElement) return;

    const studentAnswer = inputElement.value.trim().toLowerCase();
    const correctAnswer = container.dataset.answer.trim().toLowerCase();

    // Verify match
    if (studentAnswer === correctAnswer) {
        resultElement.textContent = "✅ Correct!";
        resultElement.className = "result correct";
    } else {
        resultElement.textContent = "❌ Try again";
        resultElement.className = "result wrong";
    }
}
