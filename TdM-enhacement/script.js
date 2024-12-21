let language;
let mode;
let currentCalculation;
let correctAnswer;
let points = 0;
let calc;

function startGame() {
    language = document.getElementById("language").value; // define language
    document.getElementById("language-selection").style.display = "none"; // hide the language menu
    document.getElementById("welcome").style.display = "block"; // display welcome section

    // Change title based on selected language
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
    document.getElementById("main-title").innerHTML = titles[language];

    document.getElementById("player-answer").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission
            submitAnswer();
        }
    });

    getWelcomeMessage(); // trigger welcome message
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

function generateCalculation() {
    let operator;
    if (mode === 0) { // Training Mode
        operator = calc === 0 ? "+" : calc === 1 ? "-" : calc === 2 ? "*" : "/";
    } else { // Gaming Mode
        operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    }

    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    currentCalculation = `${n1} ${operator} ${n2}`;
    correctAnswer = eval(currentCalculation); // Not recommended, but safe for simple calculations
    document.getElementById("calculation").innerHTML = currentCalculation;
    document.getElementById("calculation-area").style.display = "block";
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
    document.getElementById("game-area").style.display = "none";
    document.getElementById("goodbye-section").style.display = "block";

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
    document.getElementById("goodbye-message").innerHTML = `${goodbyeMessages[language]} ${points}`;
    points = 0;
    setTimeout(function(){}, 5000);
    document.getElementById("goodbye-section").style.display = "none";
    document.getElementById("language-selection").style.display = "block";
}



function quitGame() {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("result-message").innerText = '';

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

    pointsInDiffLanguages = {
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
    }
    
    document.getElementById("goodbye-section").style.display = "block";
    document.getElementById("goodbye-message").innerHTML = goodbyeMessages[language] + points + pointsInDiffLanguages[language];

    // Set a timeout to hide the section after 10 seconds
    setTimeout(function() {
        document.getElementById("goodbye-section").style.display = "none";
    }, 10000);


    // reset all variables
    language = undefined;
    mode = undefined;
    currentCalculation = undefined;
    correctAnswer = undefined;
    points = 0;
    calc = undefined;

    document.getElementById("language-selection").style.display = "block";   
}