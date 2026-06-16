document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-include]").forEach(async (el) => {
        const file = el.getAttribute("data-include");
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.innerHTML = await response.text();
            } else {
                el.innerHTML = "Page not found.";
            }
        } catch (err) {
            console.error("Error loading include file:", err);
        }
    });
});
