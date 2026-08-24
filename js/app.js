// ==========================================
// PARTE 1: VARIÁVEIS GLOBAIS E BOOTSTRAP
// ==========================================
let currentQuizQuestions = [];
let multiplayerState = { active: false, player1Score: 0, player2Score: 0, currentTurn: 1, answers: [] };
let pomodoroInterval = null;
let pomodoroTimeLeft = 25 * 60;
let isDrawing = false;
let canvas, ctx;

// DISPARA TODAS AS FUNÇÕES COMPLEMENTARES AO ABRIR O SITE
window.onload = function() {
    const savedTheme = localStorage.getItem('fisica_theme_pref') || 'claro';
    document.getElementById('theme-selector').value = savedTheme;
    changeTheme(savedTheme);

    const savedNotes = localStorage.getItem('fisica_markdown_notes') || '';
    document.getElementById('markdown-input').value = savedNotes;
    processAndSaveNotes();

    const savedExamDate = localStorage.getItem('fisica_exam_date') || '';
    if(savedExamDate) {
        document.getElementById('exam-date-input').value = savedExamDate;
        calculateExamSchedule();
    }

    loadHighScore();
    renderHistoryTable();
    toggleCalcFields();
    loadEscritas();
    loadFlashcards();
    updatePomodoroDisplay();
};

// ==========================================
// PARTE 2: CORE VISUAL, TEMAS E PRODUTIVIDADE
// ==========================================

// ALTERNA ENTRE AS ABAS DA PLATAFORMA
function switchTab(sectionId, element) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active-section');
    element.classList.add('active');
    if(sectionId === 'tools-sect') initWhiteboard();
}

// ATUALIZA A FOLHA DE ESTILO DE ACORDO COM O TEMA ESCOLHIDO
function changeTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('fisica_theme_pref', themeName);
}

// ABRE O FORMULÁRIO DE BOLSO FLUTUANTE
function openFormulaModal() { document.getElementById('formula-modal').classList.add('open'); }

// FECHA O FORMULÁRIO DE BOLSO AO CLICAR FORA OU NO BOTÃO X
function closeFormulaModal(e, force = false) {
    if (force || e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal-btn')) {
        document.getElementById('formula-modal').classList.remove('open');
    }
}

// FORMATA E EXIBE O CRONÔMETRO POMODORO
function updatePomodoroDisplay() {
    let min = Math.floor(pomodoroTimeLeft / 60).toString().padStart(2, '0');
    let sec = (pomodoroTimeLeft % 60).toString().padStart(2, '0');
    document.getElementById('pomodoro-timer').innerText = `${min}:${sec}`;
}

// INICIA A CONTAGEM REGRESSIVA DO POMODORO
function startPomodoro() {
    if (pomodoroInterval) return;
    document.getElementById('pomodoro-status').innerText = "Status: Focado!";
    pomodoroInterval = setInterval(() => {
        if (pomodoroTimeLeft > 0) {
            pomodoroTimeLeft--;
            updatePomodoroDisplay();
        } else {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            alert("Bloco de foco concluído! Faça uma pausa.");
            pomodoroTimeLeft = 5 * 60;
            updatePomodoroDisplay();
        }
    }, 1000);
}

// PAUSA O CRONÔMETRO DO POMODORO
function pausePomodoro() { clearInterval(pomodoroInterval); pomodoroInterval = null; document.getElementById('pomodoro-status').innerText = "Status: Pausado"; }

// RESETA O POMODORO PARA OS 25 MINUTOS PADRÃO
function resetPomodoro() { pausePomodoro(); pomodoroTimeLeft = 25 * 60; updatePomodoroDisplay(); document.getElementById('pomodoro-status').innerText = "Status: Pronto"; }

// ==========================================
// PARTE 3: ENGINE DO SIMULADO E MULTIJOGADOR
// ==========================================
function toggleMultiplayerSetup() {
    const isMulti = document.getElementById('quiz-mode').value === 'multi';
    document.getElementById('multiplayer-names').style.display = isMulti ? 'block' : 'none';
}

function startQuiz() {
    document.getElementById('quiz-init').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('challenge-share-zone').style.display = 'none';

    const filter = document.getElementById('quiz-filter').value;
    let pool = [...questionBank];
    
    if (filter !== 'todos') {
        if(filter === 'aula30') pool = pool.slice(0, 13);
        else if(filter === 'aula32') pool = pool.slice(13, 26);
        else if(filter === 'aula33') pool = pool.slice(26, 38);
        else if(filter === 'aula34') pool = pool.slice(38, 50);
    }

    currentQuizQuestions = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    multiplayerState.active = (document.getElementById('quiz-mode').value === 'multi');
    multiplayerState.currentTurn = 1;
    multiplayerState.player1Score = 0;
    multiplayerState.player2Score = 0;

    renderQuizScreen();
}

function renderQuizScreen() {
    const indicator = document.getElementById('multiplayer-turn-indicator');
    if (multiplayerState.active) {
        indicator.style.display = 'block';
        let p1 = document.getElementById('player1-name').value || "Jogador 1";
        let p2 = document.getElementById('player2-name').value || "Jogador 2";
        indicator.innerText = `🎮 Vez de: ${multiplayerState.currentTurn === 1 ? p1 : p2}`;
    } else {
        indicator.style.display = 'none';
    }

    const area = document.getElementById('questions-area');
    area.innerHTML = '';

    currentQuizQuestions.forEach((item, idx) => {
        let optionsHTML = '';
        item.o.forEach((opt, oIdx) => {
            optionsHTML += `
                <label class="option-label" id="label-q${idx}-o${oIdx}">
                    <input type="radio" name="question${idx}" value="${oIdx}">
                    ${String.fromCharCode(65 + oIdx)}) ${opt}
                </label>
            `;
        });

        area.innerHTML += `
            <div class="quiz-box" id="quiz-box-${idx}">
                <div class="question-text">Questão ${idx + 1}: ${item.q}</div>
                <div class="options-container">${optionsHTML}</div>
            </div>
        `;
    });
}

function correctQuiz() {
    let score = 0;
    let feedbackIA = "";

    currentQuizQuestions.forEach((item, idx) => {
        const selected = document.querySelector(`input[name="question${idx}"]:checked`);
        for (let i = 0; i < 4; i++) {
            let lbl = document.getElementById(`label-q${idx}-o${i}`);
            if(lbl) lbl.classList.remove('correct-answer', 'wrong-answer');
        }
        if(document.getElementById(`label-q${idx}-o${item.c}`)) document.getElementById(`label-q${idx}-o${item.c}`).classList.add('correct-answer');

        if (selected) {
            let ans = parseInt(selected.value);
            if (ans === item.c) {
                score++;
            } else {
                if(document.getElementById(`label-q${idx}-o${ans}`)) document.getElementById(`label-q${idx}-o${ans}`).classList.add('wrong-answer');
                if(item.q.includes("Pascal")) feedbackIA += `⚠️ <strong>IA:</strong> Na Q${idx+1}, a prensa baseia-se no Princípio de Pascal! Se a área do pistão aumenta, a força cresce junto.<br>`;
                if(item.q.includes("Rendimento")) feedbackIA += `⚠️ <strong>IA:</strong> Na Q${idx+1}, o Rendimento real nunca chega a 100% devido ao atrito que vira calor dissipado.<br>`;
            }
        }
    });

    if (multiplayerState.active) {
        handleMultiplayerFlow(score);
    } else {
        finalizeSinglePlayerQuiz(score, feedbackIA);
    }
}

function handleMultiplayerFlow(score) {
    let p1 = document.getElementById('player1-name').value || "Jogador 1";
    let p2 = document.getElementById('player2-name').value || "Jogador 2";

    if (multiplayerState.currentTurn === 1) {
        multiplayerState.player1Score = score;
        alert(`Fim da rodada de ${p1}! Passe o dispositivo para ${p2}.`);
        multiplayerState.currentTurn = 2;
        document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
        document.querySelectorAll('.option-label').forEach(l => l.classList.remove('correct-answer', 'wrong-answer'));
        renderQuizScreen();
    } else {
        multiplayerState.player2Score = score;
        const resBox = document.getElementById('quiz-results');
        resBox.style.display = 'block';
        let vencedor = multiplayerState.player1Score > multiplayerState.player2Score ? p1 : p2;
        if(multiplayerState.player1Score === multiplayerState.player2Score) vencedor = "Empate Técnico!";
        resBox.innerHTML = `<h3>🏁 Resultado!</h3><p>${p1}: ${multiplayerState.player1Score}</p><p>${p2}: ${multiplayerState.player2Score}</p><h4>🏆 Vencedor: ${vencedor}</h4>`;
    }
}

function finalizeSinglePlayerQuiz(score, feedbackIA) {
    saveQuizAttemptToHistory(score);
    updateHighScore(score);
    const resBox = document.getElementById('quiz-results');
    resBox.style.display = 'block';
    resBox.innerHTML = `<h3>Simulado Concluído!</h3><p>Você acertou ${score} de 10 questões.</p><div style="text-align:left;font-size:12px;margin-top:10px;">${feedbackIA}</div>`;
    document.getElementById('challenge-share-zone').style.display = 'block';
}

function generateChallengeLink() {
    const score = localStorage.getItem('fisica_last_score') || 0;
    window.open(`https://whatsapp.com{encodeURIComponent(`Fiz ${score * 10}% no simulado de Física! Te desafio a bater meu recorde: ${window.location.href}`)}`);
}

// ==========================================
// PARTE 4: LABS, MATEMÁTICA E TEXT RENDERING
// ==========================================
function convertUnits(type) {
    if (type === 'kmh') {
        let v = parseFloat(document.getElementById('input-kmh').value) || 0;
        document.getElementById('res-kmh').innerText = `= ${(v / 3.6).toFixed(2)} m/s`;
    } else if (type === 'min') {
        let v = parseFloat(document.getElementById('input-min').value) || 0;
        document.getElementById('res-min').innerText = `= ${(v * 60).toFixed(0)} s`;
    } else if (type === 'cm2') {
        let v = parseFloat(document.getElementById('input-cm2').value) || 0;
        document.getElementById('res-cm2').innerText = `= ${(v / 10000).toExponential(4)} m²`;
    }
}

function toggleCalcFields() {
    const f = document.getElementById('calc-formula-select').value;
    const container = document.getElementById('calc-inputs-fields');
    if (!container) return;
    container.innerHTML = '';
    
    if (f === 'trabalho') {
        container.innerHTML = `
            <div><label>Força (N):</label><input type="number" id="c-f" value="10"></div>
            <div><label>Deslocamento (m):</label><input type="number" id="c-d" value="5"></div>
            <div><label>Ângulo θ (Graus):</label><input type="number" id="c-ang" value="0"></div>
        `;
    } else if (f === 'potencia') {
        container.innerHTML = `
            <div><label>Trabalho (J):</label><input type="number" id="c-w" value="500"></div>
            <div><label>Tempo Δt (s):</label><input type="number" id="c-t" value="10"></div>
        `;
    } else if (f === 'hidraulica') {
        container.innerHTML = `
            <div><label>Força 1 (N):</label><input type="number" id="c-f1" value="50"></div>
            <div><label>Área 1 (cm²):</label><input type="number" id="c-a1" value="2"></div>
            <div><label>Área 2 (cm²):</label><input type="number" id="c-a2" value="10"></div>
        `;
    }
}

function executeStepByStepCalculation() {
    const f = document.getElementById('calc-formula-select').value;
    const resBox = document.getElementById('calc-step-result');
    resBox.style.display = 'block';
    
    if (f === 'trabalho') {
        let force = parseFloat(document.getElementById('c-f').value) || 0;
        let dist = parseFloat(document.getElementById('c-d').value) || 0;
        let angDeg = parseFloat(document.getElementById('c-ang').value) || 0;
        let rad = angDeg * (Math.PI / 180);
        let cos = Math.cos(rad);
        let r = force * dist * cos;
        resBox.innerHTML = `1. W = F · d · cos(θ) ➜ 2. W = ${force} · ${dist} · cos(${angDeg}°) ➜ <strong>Resultado: W = ${r.toFixed(2)} J</strong>`;
    } else if (f === 'potencia') {
        let w = parseFloat(document.getElementById('c-w').value) || 0;
        let t = parseFloat(document.getElementById('c-t').value) || 1;
        let p = w / t;
        resBox.innerHTML = `1. P = W / Δt ➜ 2. P = ${w} / ${t} ➜ <strong>Resultado: P = ${p.toFixed(2)} W</strong>`;
    } else if (f === 'hidraulica') {
        let f1 = parseFloat(document.getElementById('c-f1').value) || 0;
        let a1 = parseFloat(document.getElementById('c-a1').value) || 1;
        let a2 = parseFloat(document.getElementById('c-a2').value) || 1;
        let f2 = (f1 / a1) * a2;
        resBox.innerHTML = `1. F1/A1 = F2/A2 ➜ 2. ${f1}/${a1} = F2/${a2} ➜ <strong>Resultado: F2 = ${f2.toFixed(2)} N</strong>`;
    }
}

function initWhiteboard() {
    canvas = document.getElementById('whiteboard');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'claro' ? '#334155' : '#f1f5f9';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    canvas.onmousedown = (e) => { isDrawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); };
    canvas.onmousemove = (e) => { if(isDrawing) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); } };
    canvas.onmouseup = () => { isDrawing = false; };
}

function clearWhiteboard() { if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); }

function processAndSaveNotes() {
    let rawText = document.getElementById('markdown-input').value;
    localStorage.setItem('fisica_markdown_notes', rawText);
    
    let html = rawText
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        .replace(/<\/ul>\s*<ul>/gim, '');
        
    document.getElementById('markdown-preview').innerHTML = html;
}
// ==========================================
// PARTE 5: FIXAÇÃO, PERSISTÊNCIA E TIMELINES
// ==========================================
function rateFlashcard(idx, rating) {
    let memoryLog = JSON.parse(localStorage.getItem('fisica_flashcards_memory')) || {};
    memoryLog[idx] = rating;
    localStorage.setItem('fisica_flashcards_memory', JSON.stringify(memoryLog));
    loadFlashcards();
}

function loadFlashcards() {
    const area = document.getElementById('flashcards-area');
    if (!area || typeof flashcardsDados === 'undefined') return;
    let memoryLog = JSON.parse(localStorage.getItem('fisica_flashcards_memory')) || {};
    
    let cardsOrdenados = flashcardsDados.map((item, index) => ({...item, originalIdx: index}))
        .sort((a, b) => {
            let weightA = memoryLog[a.originalIdx] === 'hard' ? 2 : (memoryLog[a.originalIdx] === 'medium' ? 1 : 0);
            let weightB = memoryLog[b.originalIdx] === 'hard' ? 2 : (memoryLog[b.originalIdx] === 'medium' ? 1 : 0);
            return weightB - weightA;
        });

    area.innerHTML = '';
    cardsOrdenados.forEach((item) => {
        let statusTag = memoryLog[item.originalIdx] ? `<span style="font-size:10px; opacity:0.7;">[Revisão: ${memoryLog[item.originalIdx]}]</span>` : '';
        area.innerHTML += `
            <div class="card-scene">
                <div class="card" id="fc-${item.originalIdx}">
                    <div class="card-face card-front" onclick="document.getElementById('fc-${item.originalIdx}').classList.toggle('is-flipped')">
                        <div>${item.f}<br>${statusTag}</div>
                    </div>
                    <div class="card-face card-back">
                        <div onclick="document.getElementById('fc-${item.originalIdx}').classList.toggle('is-flipped')">${item.v}</div>
                        <div class="card-actions-box">
                            <button class="btn-easy" onclick="rateFlashcard(${item.originalIdx}, 'easy')">Fácil</button>
                            <button class="btn-medium" onclick="rateFlashcard(${item.originalIdx}, 'medium')">Médio</button>
                            <button class="btn-hard" onclick="rateFlashcard(${item.originalIdx}, 'hard')">Difícil</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function loadEscritas() {
    const area = document.getElementById('escritas-area');
    if (!area || typeof perguntasEscritas === 'undefined') return;
    
    area.innerHTML = '';
    perguntasEscritas.forEach((item, idx) => {
        area.innerHTML += `
            <div class="escrita-item">
                <h3>${item.q}</h3>
                <textarea placeholder="Redija aqui sua resposta analítica..."></textarea>
                <button class="gabarito-btn" onclick="toggleGabarito(${idx})">Checar Gabarito Sugerido</button>
                <div class="resposta-esperada" id="gabarito-${idx}">${item.resp}</div>
            </div>
        `;
    });
}

function toggleGabarito(idx) {
    const el = document.getElementById(`gabarito-${idx}`);
    if(el) el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

function saveQuizAttemptToHistory(score) {
    localStorage.setItem('fisica_last_score', score);
    let logs = JSON.parse(localStorage.getItem('fisica_quiz_logs')) || [];
    let now = new Date();
    let timeStr = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')} às ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    
    logs.unshift({ date: timeStr, score: score });
    if(logs.length > 5) logs.pop();
    
    localStorage.setItem('fisica_quiz_logs', JSON.stringify(logs));
    renderHistoryTable();
}

function renderHistoryTable() {
    let logs = JSON.parse(localStorage.getItem('fisica_quiz_logs')) || [];
    const tbody = document.getElementById('history-log');
    if(!tbody) return;
    tbody.innerHTML = logs.length === 0 ? `<tr><td colspan="2">Nenhum teste realizado</td></tr>` : logs.map(l => `<tr><td>${l.date}</td><td><strong>${l.score}/10</strong></td></tr>`).join('');
}

function loadHighScore() {
    const savedScore = localStorage.getItem('fisica_high_score');
    if (savedScore !== null) document.getElementById('best-score').innerText = savedScore;
}

function updateHighScore(score) {
    const currentHighScore = localStorage.getItem('fisica_high_score') || 0;
    if (score > parseInt(currentHighScore)) {
        localStorage.setItem('fisica_high_score', score);
        document.getElementById('best-score').innerText = score;
    }
}

function calculateExamSchedule() {
    let dateVal = document.getElementById('exam-date-input').value;
    if(!dateVal) return;
    localStorage.setItem('fisica_exam_date', dateVal);
    
    let diffDays = Math.ceil((new Date(dateVal + "T00:00:00") - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
    const msgBox = document.getElementById('scheduler-message');
    msgBox.innerHTML = diffDays < 0 ? `🏁 A data informada já passou!` : (diffDays === 0 ? `🚨 <strong>É hoje!</strong> Dia da prova de Física. Boa sorte!` : `⏳ Faltam <strong>${diffDays} dias</strong> para sua prova. <br>🎯 <strong>Meta:</strong> Faça 1 simulado hoje.`);
}
