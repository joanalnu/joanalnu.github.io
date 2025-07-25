let language;
let mode;
let currentCalculation;
let correctAnswer;
let points = 0;
let calc;
// import messages from './messages.js';


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

    document.getElementById("main-title").innerHTML = messages.titles[language];
    document.getElementById("footer").innerHTML = messages.footers[language];
}

function handleEnterPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission behavior
        submitAnswer(); // Call the function to submit the player's answer
    }
}

function getWelcomeMessage() {
    document.getElementById("continue-button").innerHTML = messages.continues[language];
    document.getElementById("welcome-message").innerHTML = messages.welcomeMessages[language];
}

function quitWelcomeMessage() {
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("mode-selection").style.display = "block";
    document.getElementById("mode-selection-title").innerHTML = messages.modeSelectionTitles[language];

    // Set button titles for the modes
    document.getElementById("mode-1-button").innerHTML = messages.modeButtons.mode1[language];
    document.getElementById("mode-2-button").innerHTML = messages.modeButtons.mode2[language];
}

function modeSelection(selectedMode) {
    mode = selectedMode;
    if (mode === 1) {
        document.getElementById("game-area").style.display = "block";
        generateCalculation();
    } else if (mode === 0) {
        // Training Mode
        document.getElementById("calculation-selection").style.display = "block";
        document.getElementById("mode-selection-title").innerHTML = messages.modeSelectionTitles[language];

        // Calculation buttons
        document.getElementById("calc-1-button").innerHTML = messages.calcButtons.calc1[language];
        document.getElementById("calc-2-button").innerHTML = messages.calcButtons.calc2[language];
        document.getElementById("calc-3-button").innerHTML = messages.calcButtons.calc3[language];
        document.getElementById("calc-4-button").innerHTML = messages.calcButtons.calc4[language];
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


    document.getElementById("submit-button").innerHTML = messages.submitButton[language];
    document.getElementById("quit-button").innerHTML = messages.quitButton[language];
    document.getElementById("player-answer").placeholder = messages.yourAnswerText[language];

    document.getElementById("calculation-area").style.display = "block";
    previousCalculation = currentCalculation;
}

function submitAnswer() {

    const playerAnswer = parseInt(document.getElementById("player-answer").value);
    if (playerAnswer === correctAnswer) {
        points++;
        document.getElementById("result-message").innerText = messages.correctMessages[language] + points;
    } else {
        document.getElementById("result-message").innerText = messages.incorrectMessages[language] + correctAnswer;
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
    

    // Display goodbye message
    document.getElementById("goodbye-section").style.display = "block";
    document.getElementById("goodbye-message").innerHTML = messages.goodbyeMessages[language] + points + messages.pointsInDiffLanguages[language];


    document.getElementById("restart").innerHTML = messages.restartButton[language];


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


const messages = {
    titles: {
        "en": "Mental Calculation Trainer",
        "es": "Entrenador de Cálculo Mental",
        "ca": "Entrenador de Càlcul Mental",
        "de": "Mentalrechner Trainer",
        "fr": "Entraîneur de Calcul Mental",
        "it": "Allenatore di Calcolo Mentale",
        "pt": "Treinador de Cálculo Mental",
        "zh": "心算训练员",
        "ja": "メンタル計算トレーナー",
        "ko": "멘탈 계산 트레이너",
        "ar": "مدرب الحساب الذهني",
        "ru": "Тренер по ментальной арифметике",
        "hi": "मानसिक गणना प्रशिक्षक",
        "bn": "মানসিক গণনা প্রশিক্ষক",
        "tr": "Zihinsel Hesaplama Eğitmeni",
        "vi": "Huấn luyện viên Tính toán Tâm trí",
        "th": "ผู้ฝึกสอนการคำนวณทางจิต",
        "fa": "مربی حساب ذهنی",
        "ms": "Jurulatih Pengiraan Mental",
        "tl": "Tagapagsanay sa Mental na Pagkalkula",
        "sw": "Mfundishaji wa Hesabu za Akili",
        "pl": "Trener Obliczeń Mentalnych",
        "uk": "Тренер з ментальної арифметики"
    },
    footers: {
        "en": "© 2024 All Rights Reserved | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Instructions</a>",
        "es": "© 2024 Todos los derechos reservados | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Instrucciones</a>",
        "ca": "© 2024 Tots els drets reservats | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Instruccions</a>",
        "de": "© 2024 Alle Rechte vorbehalten | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Anleitung</a>",
        "fr": "© 2024 Tous droits réservés | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Instructions</a>",
        "it": "© 2024 Tutti i diritti riservati | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Istruzioni</a>",
        "pt": "© 2024 Todos os direitos reservados | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Instruções</a>",
        "zh": "© 2024 版权所有 | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>说明</a>",
        "ja": "© 2024 すべての権利予約 | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>説明</a>",
        "ko": "© 2024 모든 권한 보유 | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>설명</a>",
        "ar": "© 2024 جميع الحقوق محفوظة | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>تعليمات</a>",
        "ru": "© 2024 Все права защищены | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Инструкции</a>",
        "hi": "© 2024 सभी अधिकार सुरक्षित | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>निर्देश</a>",
        "bn": "© 2024 সমস্ত অধিকার সংরক্ষিত | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>নির্দেশাবলী</a>",
        "tr": "© 2024 Tüm hakları saklıdır | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Talimatlar</a>",
        "vi": "© 2024 Bảo lưu tất cả quyền | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Hướng dẫn</a>",
        "th": "© 2024 สงวนลิขสิทธิ์ | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>คำแนะนำ</a>",
        "fa": "© 2024 کلیه حقوق محفوظ است | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>دستورالعمل‌ها</a>",
        "ms": "© 2024 Semua Hak Cipta Terpelihara | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Arahan</a>",
        "tl": "© 2024 Lahat ng Karapatan ay Nakalaan | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Mga Tagubilin</a>",
        "sw": "© 2024 Haki Zote Zinaifadhiwa | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Maagizo</a>",
        "pl": "© 2024 Wszelkie prawa zastrzeżone | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Instrukcje</a>",
        "uk": "© 2024 Усі права захищені | <a href='https://github.com/joanalnu/TdM/blob/main/README.md'>Інструкції</a>"
    },
    continues: {
        "en": "Continue",
        "es": "Continuar",
        "ca": "Continuar",
        "de": "Fortsetzen",
        "fr": "Continuer",
        "it": "Continuare",
        "pt": "Continuar",
        "zh": "继续",
        "ja": "続ける",
        "ko": "계속하기",
        "ar": "استمرار",
        "ru": "Продолжить",
        "hi": "जारी रखें",
        "bn": "অবিরত রাখুন",
        "tr": "Devam Et",
        "vi": "Tiếp tục",
        "th": "ดำเนินการต่อ",
        "fa": "ادامه دادن",
        "ms": "Teruskan",
        "tl": "Magpatuloy",
        "sw": "Endelea",
        "pl": "Kontynuuj",
        "uk": "Продовжити"
    },
    welcomeMessages: {
        "en": "Hello, I'm your mental calculation trainer.",
        "es": "Hola, soy tu entrenador de cálculo mental.",
        "ca": "Hola, soc el teu entrenador de càlcul mental.",
        "de": "Hallo, ich bin Ihr Trainer für Kopfrechnen.",
        "fr": "Bonjour, je suis votre entraîneur en calcul mental.",
        "it": "Salve, sono il vostro allenatore di calcolo mentale.",
        "pt": "Olá, sou o vosso treinador de cálculo mental.",
        "zh": "你好，我是你的心算培训师。",
        "ja": "こんにちは、私はあなたのメンタル計算トレーナーです。",
        "ko": "안녕하세요, 저는 여러분의 멘탈 계산 트레이너입니다.",
        "ar": "مرحبًا، أنا مدرب الحساب الذهني الخاص بك.",
        "ru": "Здравствуйте, я ваш тренер по ментальной арифметике.",
        "hi": "नमस्ते, मैं आपका मानसिक गणना प्रशिक्षक हूँ।",
        "bn": "হ্যালো, আমি আপনার মানসিক গণনা প্রশিক্ষক।",
        "tr": "Merhaba, ben sizin zihinsel hesaplama eğitmeninizim.",
        "vi": "Xin chào, tôi là huấn luyện viên tính toán tâm trí của bạn.",
        "th": "สวัสดีครับ/ค่ะ, ฉันคือนักฝึกสอนการคำนวณทางจิตของคุณ",
        "fa": "سلام، من مربی حساب ذهنی شما هستم.",
        "ms": "Hello, saya pelatih pengiraan mental anda.",
        "tl": "Kamusta, ako ang iyong tagapagsanay sa mental na pagkalkula.",
        "sw": "Habari, mimi ni mfundishaji wako wa hesabu za akili.",
        "pl": "Cześć, jestem twoim trenerem obliczeń mentalnych.",
        "uk": "Привіт, я ваш тренер з ментальної арифметики."
    },
    modeSelectionTitles: {
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
        "ar": "اختر وضعًا",
        "ru": "Выберите режим",
        "hi": "एक मोड चुनें",
        "bn": "একটি মোড নির্বাচন করুন",
        "tr": "Bir Mod Seçin",
        "vi": "Chọn chế độ",
        "th": "เลือกโหมด",
        "fa": "یک حالت انتخاب کنید",
        "ms": "Pilih Mod",
        "tl": "Pumili ng Mode",
        "sw": "Chagua Hali",
        "pl": "Wybierz tryb",
        "uk": "Виберіть режим"
    },
    modeButtons: {
        "mode1": {
            "en": "Training Mode",
            "es": "Modo de Entrenamiento",
            "ca": "Mode d'Entrenament",
            "de": "Trainingsmodus",
            "fr": "Mode d'Entraînement",
            "it": "Modalità di Allenamento",
            "pt": "Modo de Treinamento",
            "zh": "培训模式",
            "ja": "トレーニングモード",
            "ko": "교육 모드",
            "ar": "وضع التدريب",
            "ru": "Режим тренировки",
            "hi": "प्रशिक्षण मोड",
            "bn": "প্রশিক্ষণ মোড",
            "tr": "Eğitim Modu",
            "vi": "Chế độ huấn luyện",
            "th": "โหมดการฝึกอบรม",
            "fa": "حالت آموزش",
            "ms": "Mod Latihan",
            "tl": "Mode ng Pagsasanay",
            "sw": "Hali ya Mafunzo",
            "pl": "Tryb treningu",
            "uk": "Режим тренування"
        },
        "mode2": {
            "en": "Gaming Mode",
            "es": "Modo de Juego",
            "ca": "Mode de Joc",
            "de": "Spielmodus",
            "fr": "Mode de Jeu",
            "it": "Modalità di Gioco",
            "pt": "Modo de Jogo",
            "zh": "游戏模式",
            "ja": "ゲーミング・モード",
            "ko": "게임 모드",
            "ar": "وضع اللعب",
            "ru": "Игровой режим",
            "hi": "गेमिंग मोड",
            "bn": "গেমিং মোড",
            "tr": "Oyun Modu",
            "vi": "Chế độ chơi",
            "th": "โหมดเกม",
            "fa": "حالت بازی",
            "ms": "Mod Permainan",
            "tl": "Mode ng Paglalaro",
            "sw": "Hali ya Michezo",
            "pl": "Tryb gry",
            "uk": "Ігровий режим"
        }
    },
    calcButtons: {
        "calc1": {
            "en": "Addition",
            "es": "Suma",
            "ca": "Suma",
            "de": "Addition",
            "fr": "Addition",
            "it": "Addizione",
            "pt": "Adição",
            "zh": "加法",
            "ja": "加算",
            "ko": "더하기",
            "ar": "جمع",
            "ru": "Сложение",
            "hi": "जोड़",
            "bn": "যোগফল",
            "tr": "Toplama",
            "vi": "Cộng",
            "th": "การบวก",
            "fa": "جمع",
            "ms": "Penambahan",
            "tl": "Pagdaragdag",
            "sw": "Kuongeza",
            "pl": "Dodawanie",
            "uk": "Додавання"
        },
        "calc2": {
            "en": "Subtraction",
            "es": "Resta",
            "ca": "Resta",
            "de": "Subtraktion",
            "fr": "Soustraction",
            "it": "Sottrazione",
            "pt": "Subtração",
            "zh": "减法",
            "ja": "減算",
            "ko": "빼기",
            "ar": "طرح",
            "ru": "Вычитание",
            "hi": "घटाना",
            "bn": "বিয়োগ",
            "tr": "Çıkarma",
            "vi": "Trừ",
            "th": "การลบ",
            "fa": "تفریق",
            "ms": "Penolakan",
            "tl": "Pagbabawas",
            "sw": "Kupunguza",
            "pl": "Odejmowanie",
            "uk": "Віднімання"
        },
        "calc3": {
            "en": "Multiplication",
            "es": "Multiplicación",
            "ca": "Multiplicació",
            "de": "Multiplikation",
            "fr": "Multiplication",
            "it": "Moltiplicazione",
            "pt": "Multiplicação",
            "zh": "乘法",
            "ja": "乗算",
            "ko": "곱하기",
            "ar": "ضرب",
            "ru": "Умножение",
            "hi": "गुणा",
            "bn": "গুণ",
            "tr": "Çarpma",
            "vi": "Nhân",
            "th": "การคูณ",
            "fa": "ضرب",
            "ms": "Pendaraban",
            "tl": "Pagmumultiply",
            "sw": "Mara",
            "pl": "Mnożenie",
            "uk": "Множення"
        },
        "calc4": {
            "en": "Division",
            "es": "División",
            "ca": "Divisió",
            "de": "Division",
            "fr": "Division",
            "it": "Divisione",
            "pt": "Divisão",
            "zh": "除法",
            "ja": "除算",
            "ko": "나누기",
            "ar": "قسمة",
            "ru": "Деление",
            "hi": "भाग",
            "bn": "ভাগ",
            "tr": "Bölme",
            "vi": "Chia",
            "th": "การหาร",
            "fa": "تقسیم",
            "ms": "Pembahagian",
            "tl": "Paghahati",
            "sw": "Gawanya",
            "pl": "Dzielenie",
            "uk": "Ділення"
        }
    },
    submitButton: {
        "en": "Submit",
        "es": "Enviar",
        "ca": "Enviar",
        "de": "Senden",
        "fr": "Soumettre",
        "it": "Invia",
        "pt": "Enviar",
        "zh": "提交",
        "ja": "送信",
        "ko": "제출",
        "ar": "إرسال",
        "ru": "Отправить",
        "hi": "सबमिट करें",
        "bn": "জমা দিন",
        "tr": "Gönder",
        "vi": "Gửi",
        "th": "ส่ง",
        "fa": "ارسال",
        "ms": "Hantar",
        "tl": "I-submit",
        "sw": "Tuma",
        "pl": "Wyślij",
        "uk": "Відправити"
    },
    quitButton: {
        "en": "Quit",
        "es": "Salir",
        "ca": "Sortir",
        "de": "Beenden",
        "fr": "Quitter",
        "it": "Esci",
        "pt": "Sair",
        "zh": "退出",
        "ja": "終了",
        "ko": "종료",
        "ar": "خروج",
        "ru": "Выйти",
        "hi": "बाहर जाएं",
        "bn": "বের হয়ে যান",
        "tr": "Çık",
        "vi": "Thoát",
        "th": "ออก",
        "fa": "خروج",
        "ms": "Keluar",
        "tl": "Lumabas",
        "sw": "Toka",
        "pl": "Zakończ",
        "uk": "Вийти"
    },
    yourAnswerText: {
        "en": "Your answer",
        "es": "Tu respuesta",
        "ca": "La teva resposta",
        "de": "Deine Antwort",
        "fr": "Votre réponse",
        "it": "La tua risposta",
        "pt": "Sua resposta",
        "zh": "你的答案",
        "ja": "あなたの答え",
        "ko": "당신의 답",
        "ar": "إجابتك",
        "ru": "Ваш ответ",
        "hi": "आपका उत्तर",
        "bn": "আপনার উত্তর",
        "tr": "Cevabınız",
        "vi": "Câu trả lời của bạn",
        "th": "คำตอบของคุณ",
        "fa": "پاسخ شما",
        "ms": "Jawapan anda",
        "tl": "Ang iyong sagot",
        "sw": "Jibu lako",
        "pl": "Twoja odpowiedź",
        "uk": "Ваша відповідь"
    },
    correctMessages: {
        "en": "Correct! Points: ",
        "es": "¡Correcto! Puntos: ",
        "ca": "Correcte! Punts: ",
        "de": "Korrekt! Punkte: ",
        "fr": "Correct! Points: ",
        "it": "Corretto! Punti: ",
        "pt": "Correto! Pontos: ",
        "zh": "正确！分数：",
        "ja": "正解！ポイント：",
        "ko": "정답! 포인트: ",
        "ar": "صحيح! النقاط: ",
        "ru": "Правильно! Очки: ",
        "hi": "सही! अंक: ",
        "bn": "সঠিক! পয়েন্ট: ",
        "tr": "Doğru! Puanlar: ",
        "vi": "Đúng! Điểm: ",
        "th": "ถูกต้อง! คะแนน: ",
        "fa": "درست! امتیاز: ",
        "ms": "Betul! Mata: ",
        "tl": "Tama! Mga puntos: ",
        "sw": "Sahihi! Pointi: ",
        "pl": "Poprawnie! Punkty: ",
        "uk": "Правильно! Бали: "
    },
    incorrectMessages: {
        "en": "Oh no! The correct answer was: ",
        "es": "¡Oh no! La respuesta correcta era: ",
        "ca": "Oh no! La resposta correcta era: ",
        "de": "Oh nein! Die richtige Antwort war: ",
        "fr": "Oh non! La bonne réponse était : ",
        "it": "Oh no! La risposta giusta era: ",
        "pt": "Oh não! A resposta correta era: ",
        "zh": "哦不！正确答案是：",
        "ja": "おっと！正しい答えは：",
        "ko": "오 안돼! 정답은: ",
        "ar": "أوه لا! الإجابة الصحيحة كانت: ",
        "ru": "О нет! Правильный ответ был: ",
        "hi": "अरे नहीं! सही उत्तर था: ",
        "bn": "ওহ না! সঠিক উত্তর ছিল: ",
        "tr": "Ah hayır! Doğru cevap şuydu: ",
        "vi": "Ôi không! Câu trả lời đúng là: ",
        "th": "โอ้ไม่! คำตอบที่ถูกต้องคือ: ",
        "fa": "اوه نه! پاسخ درست این بود: ",
        "ms": "Oh tidak! Jawapan yang betul ialah: ",
        "tl": "Oh hindi! Ang tamang sagot ay: ",
        "sw": "Oh hapana! Jibu sahihi lilikuwa: ",
        "pl": "Och nie! Prawidłowa odpowiedź to: ",
        "uk": "О ні! Правильна відповідь була: "
    },
    goodbyeMessages: {
        "en": "Thanks for playing! You scored: ",
        "es": "¡Gracias por jugar! Has obtenido: ",
        "ca": "Gràcies per jugar! Has obtingut: ",
        "de": "Danke fürs Spielen! Du hast erzielt: ",
        "fr": "Merci d'avoir joué! Vous avez marqué : ",
        "it": "Grazie per aver giocato! Hai ottenuto: ",
        "pt": "Obrigado por jogar! Você marcou: ",
        "zh": "感谢您的参与！您得分：",
        "ja": "遊んでくれてありがとう！あなたのスコア：",
        "ko": "게임에 참여해 주셔서 감사합니다! 당신의 점수는: ",
        "ar": "شكرًا للعب! لقد حصلت على: ",
        "ru": "Спасибо за игру! Вы набрали: ",
        "hi": "खेलने के लिए धन्यवाद! आपने अंक प्राप्त किए: ",
        "bn": "খেলাধুলার জন্য ধন্যবাদ! আপনি স্কোর করেছেন: ",
        "tr": "Oynadığınız için teşekkürler! Puanınız: ",
        "vi": "Cảm ơn đã chơi! Bạn đã ghi được: ",
        "th": "ขอบคุณที่เล่น! คุณทำคะแนนได้: ",
        "fa": "ممنون از بازی! شما امتیاز گرفتید: ",
        "ms": "Terima kasih kerana bermain! Anda mendapat: ",
        "tl": "Salamat sa paglalaro! Nakakuha ka ng: ",
        "sw": "Asante kwa kucheza! Umejumuisha: ",
        "pl": "Dziękujemy za grę! Zdobyłeś: ",
        "uk": "Дякуємо за гру! Ви заробили: "
    },
    pointsInDiffLanguages: {
        "en": " points.",
        "es": " puntos.",
        "ca": " punts.",
        "de": " Punkte.",
        "fr": " points.",
        "it": " punti.",
        "pt": " pontos.",
        "zh": " 分.",
        "ja": " 点.",
        "ko": " 점.",
        "ar": " نقاط.",
        "ru": " очков.",
        "hi": " अंक.",
        "bn": " পয়েন্ট.",
        "tr": " puan.",
        "vi": " điểm.",
        "th": " คะแนน.",
        "fa": " امتیاز.",
        "ms": " mata.",
        "tl": " mga puntos.",
        "sw": " pointi.",
        "pl": " punkty.",
        "uk": " бали."
    },
    restartButton: {
        "en": "Restart",
        "es": "Reiniciar",
        "ca": "Reiniciar",
        "de": "Neustart",
        "fr": "Redémarrer",
        "it": "Riavvia",
        "pt": "Reiniciar",
        "zh": "重新开始",
        "ja": "再開",
        "ko": "다시 시작",
        "ar": "إعادة التشغيل",
        "ru": "Перезапустить",
        "hi": "पुनः प्रारंभ करें",
        "bn": "পুনরায় শুরু করুন",
        "tr": "Yeniden Başlat",
        "vi": "Khởi động lại",
        "th": "เริ่มใหม่",
        "fa": "راه اندازی مجدد",
        "ms": "Mula semula",
        "tl": "I-restart",
        "sw": "Anza tena",
        "pl": "Restart",
        "uk": "Перезапустити"
    }
};