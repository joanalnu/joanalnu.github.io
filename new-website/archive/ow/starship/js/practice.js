/**
 * Space Math Academy - Practice Sheet Engine (Minimal & Dense)
 * (Dynamic, zero-state telemetry, offline & file:// protocol friendly)
 */

document.addEventListener("DOMContentLoaded", () => {
    // Check if WEEK_DATA is defined
    if (typeof WEEK_DATA === "undefined") {
        console.error("WEEK_DATA is not defined. Please define it in the HTML file.");
        return;
    }

    const appContainer = document.getElementById("practice-app");
    if (!appContainer) {
        console.error("Target div #practice-app not found in the DOM.");
        return;
    }

    const weekId = WEEK_DATA.id || "week_unknown";
    const saveKey = `starship_progress_${weekId}`;
    
    // Load progress from localStorage
    let progress = JSON.parse(localStorage.getItem(saveKey)) || {};

    const layout = WEEK_DATA.layout || "grid"; // "grid" or "drills"

    // Run setup
    initApp();

    function initApp() {
        // Build the basic HTML layout
        appContainer.className = `practice-container layout-${layout}`;
        
        // 1. Minimal Header Bar
        const header = document.createElement("header");
        header.className = "practice-header-minimal";
        header.innerHTML = `
            <div class="header-left">
                <a href="index.html" class="back-link">⬅️ Misiones</a>
                <h1>🛰️ ${WEEK_DATA.title || "Misión de Práctica"}</h1>
            </div>
            <div class="header-right">
                <span class="progress-badge" id="header-progress">0 / 0</span>
                <button class="reset-btn-minimal" id="reset-btn" title="Reiniciar progreso de esta semana">🔄 Reiniciar</button>
            </div>
        `;
        appContainer.appendChild(header);

        // Reset button listener
        header.querySelector("#reset-btn").addEventListener("click", () => {
            if (confirm("¿Seguro que quieres reiniciar todo tu progreso de esta semana?")) {
                progress = {};
                localStorage.removeItem(saveKey);
                renderProblems();
                updateStats();
            }
        });

        if (layout === "drills") {
            // Render Instruction Sentence
            if (WEEK_DATA.instruction) {
                const instructionDiv = document.createElement("div");
                instructionDiv.className = "drills-instruction";
                instructionDiv.innerHTML = WEEK_DATA.instruction;
                appContainer.appendChild(instructionDiv);
            }

            // Render Drills Grid Container
            const drillsGrid = document.createElement("main");
            drillsGrid.className = "drills-grid";
            drillsGrid.id = "drills-grid";
            appContainer.appendChild(drillsGrid);
        } else {
            // Render Dense Problems Grid
            const problemsGrid = document.createElement("main");
            problemsGrid.className = "problems-grid-dense";
            problemsGrid.id = "problems-grid";
            appContainer.appendChild(problemsGrid);
        }

        // Render contents
        renderProblems();
        updateStats();
    }

    function renderProblems() {
        const problems = WEEK_DATA.problems || [];

        if (layout === "drills") {
            const grid = document.getElementById("drills-grid");
            grid.innerHTML = "";

            problems.forEach((prob, index) => {
                const isCorrect = progress[prob.id] && progress[prob.id].correct;
                const value = progress[prob.id] ? progress[prob.id].value : "";

                const row = document.createElement("div");
                row.className = `drill-row ${isCorrect ? 'is-correct' : ''}`;
                row.id = `drill-${prob.id}`;

                // Label (e.g. "a)" or "1)")
                const labelText = prob.label || `${String.fromCharCode(97 + (index % 26))})`; // auto a), b), c) if not provided
                const label = document.createElement("span");
                label.className = "drill-label";
                label.textContent = labelText;
                row.appendChild(label);

                // Question
                const question = document.createElement("span");
                question.className = "drill-question";
                question.innerHTML = prob.question;
                row.appendChild(question);

                // Input
                const input = document.createElement("input");
                input.type = "text";
                input.className = "drill-input";
                input.value = value;
                input.disabled = isCorrect;
                row.appendChild(input);

                // Check Button (compact tick icon)
                const checkBtn = document.createElement("button");
                checkBtn.className = "drill-btn";
                checkBtn.innerHTML = "✓";
                checkBtn.disabled = isCorrect;
                row.appendChild(checkBtn);

                // Status Indicator
                const status = document.createElement("span");
                status.className = "drill-status";
                if (isCorrect) {
                    status.textContent = "✅";
                } else if (value) {
                    status.textContent = "❌";
                }
                row.appendChild(status);

                // Check function
                const checkHandler = () => {
                    const studentVal = input.value;
                    const correct = verifyAnswer(studentVal, prob.answer);

                    progress[prob.id] = {
                        value: studentVal,
                        correct: correct
                    };
                    localStorage.setItem(saveKey, JSON.stringify(progress));

                    if (correct) {
                        row.classList.add("is-correct");
                        input.disabled = true;
                        checkBtn.disabled = true;
                        status.textContent = "✅";
                        spawnSparks(checkBtn);
                        updateStats();
                    } else {
                        row.classList.remove("shake");
                        void row.offsetWidth; // trigger reflow to restart animation
                        row.classList.add("shake");
                        status.textContent = "❌";
                    }
                };

                checkBtn.addEventListener("click", checkHandler);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" && !isCorrect) {
                        checkHandler();
                    }
                });

                grid.appendChild(row);
            });
        } else {
            const grid = document.getElementById("problems-grid");
            grid.innerHTML = "";

            problems.forEach((prob, index) => {
                const isCorrect = progress[prob.id] && progress[prob.id].correct;
                const value = progress[prob.id] ? progress[prob.id].value : "";

                const card = document.createElement("article");
                card.className = `problem-card-dense ${isCorrect ? 'is-correct' : ''}`;
                card.id = `card-${prob.id}`;

                // Header
                const header = document.createElement("div");
                header.className = "dense-header";
                header.innerHTML = `
                    <span class="dense-num">EJERCICIO ${index + 1}</span>
                    ${prob.hint ? '<button class="dense-hint-btn" title="Ver pista">💡</button>' : ''}
                `;
                card.appendChild(header);

                // Question
                const question = document.createElement("div");
                question.className = "dense-question";
                question.innerHTML = prob.question;
                card.appendChild(question);

                // Hint box (hidden by default)
                let hintBox = null;
                if (prob.hint) {
                    hintBox = document.createElement("div");
                    hintBox.className = "dense-hint-box";
                    hintBox.style.display = progress[prob.id] && progress[prob.id].hintUsed ? "block" : "none";
                    hintBox.innerHTML = prob.hint;
                    card.appendChild(hintBox);

                    const hintBtn = header.querySelector(".dense-hint-btn");
                    hintBtn.addEventListener("click", () => {
                        const isHidden = hintBox.style.display === "none";
                        hintBox.style.display = isHidden ? "block" : "none";
                        if (isHidden) {
                            if (!progress[prob.id]) progress[prob.id] = { value: "", correct: false };
                            progress[prob.id].hintUsed = true;
                            localStorage.setItem(saveKey, JSON.stringify(progress));
                        }
                    });
                }

                // Input Area
                const inputRow = document.createElement("div");
                inputRow.className = "dense-input-row";

                if (prob.options && prob.options.length > 0) {
                    // Multiple Choice
                    const optionsGrid = document.createElement("div");
                    optionsGrid.className = "options-grid";
                    
                    prob.options.forEach(opt => {
                        const optBtn = document.createElement("button");
                        optBtn.className = "option-btn";
                        optBtn.textContent = opt;
                        
                        if (isCorrect && opt === prob.answer) {
                            optBtn.classList.add("correct");
                        } else if (value === opt && opt !== prob.answer) {
                            optBtn.classList.add("wrong");
                        } else if (value === opt) {
                            optBtn.classList.add("selected");
                        }
                        
                        optBtn.disabled = isCorrect;
                        optBtn.addEventListener("click", () => {
                            const correct = verifyAnswer(opt, prob.answer);
                            progress[prob.id] = {
                                value: opt,
                                correct: correct,
                                hintUsed: progress[prob.id] ? progress[prob.id].hintUsed : false
                            };
                            localStorage.setItem(saveKey, JSON.stringify(progress));
                            
                            // Re-render local problem layout to update choices styles
                            renderProblems();
                            updateStats();

                            if (correct) {
                                spawnSparks(optBtn);
                            } else {
                                card.classList.remove("shake");
                                void card.offsetWidth;
                                card.classList.add("shake");
                            }
                        });
                        optionsGrid.appendChild(optBtn);
                    });
                    card.appendChild(optionsGrid);
                } else {
                    // Text input
                    const input = document.createElement("input");
                    input.type = "text";
                    input.className = "dense-input";
                    input.placeholder = prob.placeholder || "Respuesta...";
                    input.value = value;
                    input.disabled = isCorrect;
                    inputRow.appendChild(input);

                    const checkBtn = document.createElement("button");
                    checkBtn.className = "dense-btn btn-primary";
                    checkBtn.textContent = "Comprobar";
                    checkBtn.disabled = isCorrect;
                    inputRow.appendChild(checkBtn);

                    const checkHandler = () => {
                        const studentVal = input.value;
                        const correct = verifyAnswer(studentVal, prob.answer);

                        progress[prob.id] = {
                            value: studentVal,
                            correct: correct,
                            hintUsed: progress[prob.id] ? progress[prob.id].hintUsed : false
                        };
                        localStorage.setItem(saveKey, JSON.stringify(progress));

                        if (correct) {
                            card.classList.add("is-correct");
                            input.disabled = true;
                            checkBtn.disabled = true;
                            spawnSparks(checkBtn);
                            updateStats();
                        } else {
                            card.classList.remove("shake");
                            void card.offsetWidth;
                            card.classList.add("shake");
                        }
                    };

                    checkBtn.addEventListener("click", checkHandler);
                    input.addEventListener("keydown", (e) => {
                        if (e.key === "Enter" && !isCorrect) {
                            checkHandler();
                        }
                    });

                    card.appendChild(inputRow);
                }

                grid.appendChild(card);
            });
        }

        // Re-run MathJax to typeset the dynamic content
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise();
        }
    }

    function verifyAnswer(student, correct) {
        const cleanStudent = student.trim().toLowerCase();
        const cleanCorrect = correct.trim().toLowerCase();
        
        const superCleanStudent = cleanStudent.replace(/\s+/g, '');
        const superCleanCorrect = cleanCorrect.replace(/\s+/g, '');
        
        if (superCleanStudent === superCleanCorrect) return true;

        const studentNum = parseFloat(cleanStudent.replace(',', '.'));
        const correctNum = parseFloat(cleanCorrect.replace(',', '.'));

        if (!isNaN(studentNum) && !isNaN(correctNum)) {
            return Math.abs(studentNum - correctNum) < 1e-9;
        }

        return false;
    }

    function updateStats() {
        const problems = WEEK_DATA.problems || [];
        const total = problems.length;
        if (total === 0) return;

        let solved = 0;
        problems.forEach(p => {
            if (progress[p.id] && progress[p.id].correct) {
                solved++;
            }
        });

        const percent = Math.round((solved / total) * 100);

        // Update Header Badge
        const progressBadge = document.getElementById("header-progress");
        if (progressBadge) {
            progressBadge.textContent = `${solved} / ${total} (${percent}%)`;
            if (percent === 100) {
                progressBadge.classList.add("complete");
            } else {
                progressBadge.classList.remove("complete");
            }
        }

        // Celebrations
        if (percent === 100) {
            const alreadyCeleb = appContainer.dataset.celebrated === "true";
            if (!alreadyCeleb) {
                appContainer.dataset.celebrated = "true";
                setTimeout(triggerGrandCelebration, 300);
            }
        } else {
            appContainer.dataset.celebrated = "false";
        }
    }

    function spawnSparks(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;
        
        const numParticles = 15;
        const colors = ['#38bdf8', '#10b981', '#fbbf24', '#a78bfa'];
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement("div");
            particle.className = "spark-particle";
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty("--tx", `${tx}px`);
            particle.style.setProperty("--ty", `${ty}px`);
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }

    function triggerGrandCelebration() {
        let count = 0;
        const interval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.7);
            
            const dummy = document.createElement("div");
            dummy.style.position = "absolute";
            dummy.style.left = `${x}px`;
            dummy.style.top = `${y + window.scrollY}px`;
            dummy.style.width = "1px";
            dummy.style.height = "1px";
            document.body.appendChild(dummy);
            
            spawnSparks(dummy);
            
            setTimeout(() => dummy.remove(), 1000);
            
            count++;
            if (count > 8) clearInterval(interval);
        }, 150);
    }
});
