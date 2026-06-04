function checkAnswer(button) {

    const container = button.closest(".problem-box");

    const answer =
        container.querySelector(".answer").value.trim();

    const expected =
        container.dataset.answer.trim();

    const result =
        container.querySelector(".result");

    if (answer === expected) {
        result.textContent = "✅ Correct!";
        result.className = "result correct";
    }
    else {
        result.textContent = "❌ Try again";
        result.className = "result wrong";
    }
}
