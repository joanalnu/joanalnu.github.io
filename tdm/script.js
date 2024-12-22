let language;
let mode;
let currentCalculation;
let correctAnswer;
let points = 0;
let calc;


function startGame() {
    // Ensure a language is selected
    if (!document.getElementById("language").value) {
        return; // Stop if no language is selected
    }

    language = document.getElementById("language").value; // Set selected language
    document.getElementById("language-selection").style.display = "none"; // Hide the language selection
    document.getElementById("welcome").style.display = "block"; // Show the welcome message

    // Update title and footer based on selected language
    updateTitleAndFooter();

    // Clear previous calculations and answers
    document.getElementById("player-answer").value = '';
    document.getElementById("result-message").innerText = '';

    // Set up event listener for player answer
    document.getElementById("player-answer").removeEventListener("keydown", handleEnterPress); // Remove old listener
    document.getElementById("player-answer").addEventListener("keydown", handleEnterPress); // Add new listener

    // Trigger welcome message and modal content
    getWelcomeMessage();
    createModalContent();
}


function updateTitleAndFooter() {
    const titles = {
        "en": "Mental Calculation Trainer",
        "es": "Entrenador de Cálculo Mental",
        "ca": "Entrenador de Càlcul Mental",
        "de": "Mentalrechner Trainer",
        "fr": "Entraîneur de Calcul Mental",
        "it": "Allenatore di Calcolo Mentale",
        "pt": "Treinador de Cálculo Mental",
        "zh": "心算训练员",
        "ja": "メンタル計算トレーナー",
        "ko": "멘탈 계산 트레이너"
    };
    
    const footers = {
        "en": "© 2024 All Rights Reserved | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Instructions</a>",
        "es": "© 2024 Todos los derechos reservados | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/CASTELLANO.md'>Instrucciones</a>",
        "ca": "© 2024 Tots els drets reservats | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/CATALA.md'>Instruccions</a>",
        "de": "© 2024 Alle Rechte vorbehalten | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/DEUTSCH.md'>Anleitung</a>",
        "fr": "© 2024 Tous droits réservés | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/FRANCAIS.md'>Instructions</a>",
        "it": "© 2024 Tutti i diritti riservati | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/ITALIANO.md'>Istruzioni</a>",
        "pt": "© 2024 Todos os direitos reservados | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/PORTUGUES.md'>Instruções</a>",
        "zh": "© 2024 版权所有 | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/中文.md'>说明</a>",
        "ja": "© 2024 すべての権利予約 | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/日语.md'>説明</a>",
        "ko": "© 2024 모든 권한 보유 | <a href='https://github.com/joanalnu/TdM/blob/main/READMEs/한국어.md'>설명</a>"
    };

    document.getElementById("main-title").innerHTML = titles[language];
    document.getElementById("footer").innerHTML = footers[language];
}

function handleEnterPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission behavior
        submitAnswer(); // Call the function to submit the player's answer
    }
}

function getWelcomeMessage() {
    const continues = {
        "en": "Continue",
        "es": "Continuar",
        "ca": "Continuar",
        "de": "Fortsetzen",
        "fr": "Continuer",
        "it": "Continuare",
        "pt": "Continuar",
        "zh": "继续",
        "ja": "続ける",
        "ko": "계속하기"
    };
    document.getElementById("continue-button").innerHTML = continues[language];

    const messages = {
        "en": "Hello, I'm your mental calculation trainer.",
        "es": "Hola, soy tu entrenador de cálculo mental.",
        "ca": "Hola, soc el teu entrenador de càlcul mental.",
        "de": "Hallo, ich bin Ihr Trainer für Kopfrechnen.",
        "fr": "Bonjour, je suis votre entraîneur en calcul mental.",
        "it": "Salve, sono il vostro allenatore di calcolo mentale.",
        "pt": "Olá, sou o vosso treinador de cálculo mental.",
        "zh": "你好，我是你的心算培训师。",
        "ja": "こんにちは、私はあなたのメンタル計算トレーナーです。",
        "ko": "안녕하세요, 저는 여러분의 멘탈 계산 트레이너입니다."
    };
    document.getElementById("welcome-message").innerHTML = messages[language];
}

function quitWelcomeMessage() {
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("mode-selection").style.display = "block";

    const modeSelectionTitle = {
        "en": "Select a Mode",
        "es": "Seleccione un Modo",
        "ca": "Seleccioni el Mode",
        "de": "Wählen Sie Modus",
        "fr": "Sélectionner le mode",
        "it": "Selezionare la modalità",
        "pt": "Selecionar o modo",
        "zh": "选择模式",
        "ja": "モード選択",
        "ko": "모드 선택",
    };
    document.getElementById("mode-selection-title").innerHTML = modeSelectionTitle[language];

    // Set button titles for the modes
    const button1 = {
        "en": "Training Mode",
        "es": "Modo de Entrenamiento",
        "ca": "Mode d'Entrenament",
        "de": "Trainingsmodus",
        "fr": "Mode d'Entraînement",
        "it": "Modalità di Allenamento",
        "pt": "Modo de Treinamento",
        "zh": "培训模式",
        "ja": "トレーニングモード",
        "ko": "교육 모드"
    };
    const button2 = {
        "en": "Gaming Mode",
        "es": "Modo de Juego",
        "ca": "Mode de Joc",
        "de": "Spielmodus",
        "fr": "Mode de Jeu",
        "it": "Modalità di Gioco",
        "pt": "Modo de Jogo",
        "zh": "游戏模式",
        "ja": "ゲーミング・モード",
        "ko": "게임 모드"
    };
    document.getElementById("mode-1-button").innerHTML = button1[language];
    document.getElementById("mode-2-button").innerHTML = button2[language];
}

function modeSelection(selectedMode) {
    mode = selectedMode;
    if (mode === 1) {
        document.getElementById("game-area").style.display = "block";
        generateCalculation();
    } else if (mode === 0) {
        // Training Mode
        document.getElementById("calculation-selection").style.display = "block";
        const modeSelectionTitle = {
            "en": "Select Calculation Type",
            "es": "Seleccione el tipo de cálculo",
            "ca": "Seleccione el tipus de càlcul",
            "de": "Wählen Sie den Rechentyp",
            "fr": "Sélectionnez le type de calcul",
            "it": "Selezionare il tipo di calcolo",
            "pt": "Selecione o tipo de cálculo",
            "zh": "选择计算类型",
            "ja": "計算の種類を選択",
            "ko": "계산의 종류를 선택하세요"
        };
        document.getElementById("mode-selection-title").innerHTML = modeSelectionTitle[language];

        // Calculation buttons
        const button1 = {
            "en": "Addition",
            "es": "Suma",
            "ca": "Suma",
            "de": "Addition",
            "fr": "Addition",
            "it": "Addizione",
            "pt": "Adição",
            "zh": "加法",
            "ja": "加算",
            "ko": "더하기"
        };
        const button2 = {
            "en": "Subtraction",
            "es": "Resta",
            "ca": "Resta",
            "de": "Subtraktion",
            "fr": "Soustraction",
            "it": "Sottrazione",
            "pt": "Subtração",
            "zh": "减法",
            "ja": "減算",
            "ko": "빼기"
        };
        const button3 = {
            "en": "Multiplication",
            "es": "Multiplicación",
            "ca": "Multiplicació",
            "de": "Multiplikation",
            "fr": "Multiplication",
            "it": "Moltiplicazione",
            "pt": "Multiplicação",
            "zh": "乘法",
            "ja": "乗算",
            "ko": "곱하기"
        };
        const button4 = {
            "en": "Division",
            "es": "División",
            "ca": "Divisió",
            "de": "Division",
            "fr": "Division",
            "it": "Divisione",
            "pt": "Divisão",
            "zh": "除法",
            "ja": "除算",
            "ko": "나누기"
        };
        document.getElementById("calc-1-button").innerHTML = button1[language];
        document.getElementById("calc-2-button").innerHTML = button2[language];
        document.getElementById("calc-3-button").innerHTML = button3[language];
        document.getElementById("calc-4-button").innerHTML = button4[language];
    }
    document.getElementById("mode-selection").style.display = "none";
}

function selectCalculationType(selectedCalc) {
    calc = selectedCalc;
    document.getElementById("calculation-selection").style.display = "none";
    document.getElementById("game-area").style.display = "block";
    generateCalculation();
}

let previousCalculation;

function generateCalculation() {
    let operator;
    if (mode === 0) { // Training Mode
        operator = calc === 0 ? "+" : calc === 1 ? "-" : calc === 2 ? "*" : "/";
    } else { // Gaming Mode
        operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    }

    let n1, n2;
    do {
        n1 = Math.floor(Math.random() * 10) + 1;
        n2 = Math.floor(Math.random() * 10) + 1;
        currentCalculation = `${n1} ${operator} ${n2}`;
    } while (currentCalculation === previousCalculation);

    // Handle division to avoid infinite loop
    if (operator === '/') {
        n1 = Math.floor(Math.random() * 10) + 1; // Ensure n1 is a valid number
        n2 = Math.floor(Math.random() * 9) + 1; // Ensure n2 is not zero
        while (n1 % n2 !== 0) { // Ensure n1 is divisible by n2
            n1 = Math.floor(Math.random() * 10) + 1;
            n2 = Math.floor(Math.random() * 9) + 1; // Avoid zero
        }
        currentCalculation = `${n1} ${operator} ${n2}`;
    }

    correctAnswer = eval(currentCalculation); // Not recommended, but safe for simple calculations
    document.getElementById("calculation").innerHTML = currentCalculation;

    const submitButton = {
        "en": "Submit",
        "es": "Enviar",
        "ca": "Enviar",
        "de": "Senden",
        "fr": "Soumettre",
        "it": "Invia",
        "pt": "Enviar",
        "zh": "提交",
        "ja": "送信",
        "ko": "제출"
    }
    const quitButton = {
        "en": "Quit",
        "es": "Salir",
        "ca": "Sortir",
        "de": "Beenden",
        "fr": "Quitter",
        "it": "Esci",
        "pt": "Sair",
        "zh": "退出",
        "ja": "終了",
        "ko": "종료"
    }
    const yourAnswerText = {
        "en": "Your answer",
        "es": "Tu respuesta",
        "ca": "La teva resposta",
        "de": "Deine Antwort",
        "fr": "Votre réponse",
        "it": "La tua risposta",
        "pt": "Sua resposta",
        "zh": "你的答案",
        "ja": "あなたの答え",
        "ko": "당신의 답"
    }
    document.getElementById("submit-button").innerHTML = submitButton[language];
    document.getElementById("quit-button").innerHTML = quitButton[language];
    document.getElementById("player-answer").placeholder = yourAnswerText[language];

    document.getElementById("calculation-area").style.display = "block";
    previousCalculation = currentCalculation;
}

function submitAnswer() {
    const correctMessages = {
        "en": "Correct! Points: ",
        "es": "¡Correcto! Puntos: ",
        "ca": "Correcte! Punts: ",
        "de": "Korrekt! Punkte: ",
        "fr": "Correct! Points: ",
        "it": "Corretto! Punti: ",
        "pt": "Correto! Pontos: ",
        "zh": "正确！分数：",
        "ja": "正解！ポイント：",
        "ko": "정답! 포인트: "
    };

    const incorrectMessages = {
        "en": "Oh no! The correct answer was: ",
        "es": "¡Oh no! La respuesta correcta era: ",
        "ca": "Oh no! La resposta correcta era: ",
        "de": "Oh nein! Die richtige Antwort war: ",
        "fr": "Oh non! La bonne réponse était : ",
        "it": "Oh no! La risposta giusta era: ",
        "pt": "Oh não! A resposta correta era: ",
        "zh": "哦不！正确答案是：",
        "ja": "ああ！正しい答えは：",
        "ko": "오! 정답은: "
    };

    const playerAnswer = parseInt(document.getElementById("player-answer").value);
    if (playerAnswer === correctAnswer) {
        points++;
        document.getElementById("result-message").innerText = correctMessages[language] + points;
    } else {
        document.getElementById("result-message").innerText = incorrectMessages[language] + correctAnswer;
    }
    document.getElementById("player-answer").value = '';
    generateCalculation();
}

function quitGame() {
    // Hide game area and result message
    document.getElementById("game-area").style.display = "none";
    document.getElementById("calculation-area").style.display = "none";
    document.getElementById("result-message").innerText = '';

    // Show goodbye message for 5 seconds before starting a new game
    const goodbyeMessages = {
        "en": "Thanks for playing! You scored: ",
        "es": "¡Gracias por jugar! Has obtenido: ",
        "ca": "Gràcies per jugar! Has obtingut: ",
        "de": "Danke fürs Spielen! Du hast erzielt: ",
        "fr": "Merci d'avoir joué! Vous avez marqué : ",
        "it": "Grazie per aver giocato! Hai ottenuto: ",
        "pt": "Obrigado por jogar! Você marcou: ",
        "zh": "感谢您的参与！您得分：",
        "ja": "遊んでくれてありがとう！あなたのスコア：",
        "ko": "게임에 참여해 주셔서 감사합니다! 당신의 점수는: "
    };

    const pointsInDiffLanguages = {
        "en": " points.",
        "es": " puntos.",
        "ca": " punts.",
        "de": " Punkte.",
        "fr": " points.",
        "it": " punti.",
        "pt": " pontos.",
        "zh": " 分.",
        "ja": " 点.",
        "ko": " 점."
    };

    // Display goodbye message
    document.getElementById("goodbye-section").style.display = "block";
    document.getElementById("goodbye-message").innerHTML = goodbyeMessages[language] + points + pointsInDiffLanguages[language];

    const restartButton = {
        "en": "Restart",
        "es": "Reiniciar",
        "ca": "Reiniciar",
        "de": "Neustart",
        "fr": "Redémarrer",
        "it": "Riavvia",
        "pt": "Reiniciar",
        "zh": "重新开始",
        "ja": "再開",
        "ko": "다시 시작"
    };
    document.getElementById("restart").innerHTML = restartButton[language];


    // // Reset all game state variables
    // language = undefined;
    // mode = undefined;
    // currentCalculation = undefined;
    // correctAnswer = undefined;
    // points = 0;
    // calc = undefined;
    // previousCalculation = undefined;

    // // Optionally reset input fields and other UI elements
    // document.getElementById("player-answer").value = '';
    // document.getElementById("mode-selection").style.display = "none";
    // document.getElementById("calculation-selection").style.display = "none";

    // // Reinitialize the event listener for input
    // document.getElementById("player-answer").removeEventListener("keydown", handleEnterPress);
    // document.getElementById("player-answer").addEventListener("keydown", handleEnterPress);
}



// log in modal
function openModal(modalId){
    document.getElementById(modalId).style.display = 'block';
    }

    function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    }

    // Close modal when clicking outside of modal content
    window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
        modal.style.display = 'none';
        }
    }
}

function createModalContent() {
    const modalTitle = {
        "en": "Log In",
        "es": "Iniciar sesión",
        "ca": "Iniciar sessió",
        "de": "Anmelden",
        "fr": "Se connecter",
        "it": "Accedi",
        "pt": "Entrar",
        "zh": "登录",
        "ja": "ログイン",
        "ko": "로그인"
    };
    const modalContent = {
        "en": "Logging in you can avoid having to configure your game each time.",
        "es": "Al iniciar sesión, puede evitar tener que configurar su juego cada vez.",
        "ca": "Al iniciar sessió, pot evitar haver de configurar el seu joc cada vegada.",
        "de": "Wenn Sie sich anmelden, können Sie vermeiden, Ihr Spiel jedes Mal neu zu konfigurieren.",
        "fr": "En vous connectant, vous pouvez éviter de devoir configurer votre jeu à chaque fois.",
        "it": "Accedendo, puoi evitare di dover configurare il tuo gioco ogni volta.",
        "pt": "Ao entrar, você pode evitar ter que configurar seu jogo a cada vez.",
        "zh": "登录后，您可以避免每次都要配置游戏。",
        "ja": "ログインすると、ゲームを毎回設定する必要がなくなります。",
        "ko": "로그인하면 게임을 매번 설정할 필요가 없습니다."
    };
    const notYetModalContent = {
        "en": "We are sorry to inform that this feature is still under development.",
        "es": "Lo sentimos, pero esta función aún está en desarrollo.",
        "ca": "Ens disculpem, però aquesta funció encara està en desenvolupament.",
        "de": "Wir entschuldigen uns, aber diese Funktion ist noch in der Entwicklung.",
        "fr": "Nous sommes désolés de vous informer que cette fonctionnalité est encore en développement.",
        "it": "Ci scusiamo, ma questa funzionalità è ancora in sviluppo.",
        "pt": "Lamento informar que essa funcionalidade ainda está em desenvolvimento.",
        "zh": "我们很抱歉告诉您，这个功能还在开发中。",
        "ja": "ごめんなさいですが、この機能はまだ開発中です。",
        "ko": "죄송하지만, 이 기능은 아직 개발 중입니다."
    };
    document.getElementById("log-in-title").innerHTML = modalTitle[language];
    document.getElementById("log-in-button").innerHTML = modalTitle[language];
    document.getElementById("log-in-content").innerHTML = notYetModalContent[language];
    const text1 = {
        "en": "Username",
        "es": "Nombre de usuario",
        "ca": "Nom d'usuari",
        "de": "Benutzername",
        "fr": "Nom d'utilisateur",
        "it": "Nome utente",
        "pt": "Nome de usuário",
        "zh": "用户名",
        "ja": "ユーザー名",
        "ko": "사용자 이름"
    }
    const text2 = {
        "en": "Password",
        "es": "Contraseña",
        "ca": "Contrasenya",
        "de": "Passwort",
        "fr": "Mot de passe",
        "it": "Password",
        "pt": "Senha",
        "zh": "密码",
        "ja": "パスワード",
        "ko": "비밀번호"
    }
    document.getElementById("username").placeholder = text1[language];
    document.getElementById("password").placeholder = text2[language];
}