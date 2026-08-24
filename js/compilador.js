/**
 * 📦 E-LEARN CORE BUNDLE UNIFICADO
 * Este arquivo compacta e injeta todo o CSS, HTML estrutural e lógicas lógicas.
 */

// ==========================================
// MÓDULO 1: INJEÇÃO DINÂMICA DE ESTILOS (CSS)
// ==========================================
(function injetarEstilosGlobais() {
    const css = `
    :root {
        --bg-app: #f8fafc; --bg-card: #ffffff; --sidebar-color: #0f172a;
        --primary: #2563eb; --primary-hover: #1d4ed8; --success: #10b981;
        --danger: #ef4444; --text-main: #334155; --text-muted: #64748b;
        --border: #e2e8f0; --radius-lg: 12px; --radius-md: 8px;
        --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); --canvas-bg: #ffffff;
    }
    [data-theme="escuro"] {
        --bg-app: #0f172a; --bg-card: #1e293b; --sidebar-color: #020617;
        --text-main: #f1f5f9; --text-muted: #94a3b8; --border: #334155; --canvas-bg: #1e293b;
    }
    [data-theme="dracula"] {
        --bg-app: #282a36; --bg-card: #44475a; --sidebar-color: #191a21;
        --primary: #bd93f9; --success: #50fa7b; --text-main: #f8f8f2; --border: #6272a4; --canvas-bg: #282a36;
    }
    [data-theme="cyberpunk"] {
        --bg-app: #f3f4f6; --bg-card: #111827; --sidebar-color: #000000;
        --primary: #f43f5e; --success: #06b6d4; --text-main: #f9fafb; --border: #374151; --canvas-bg: #111827;
    }
    [data-theme="concurseiro"] {
        --bg-app: #fdfbf7; --bg-card: #ffffff; --sidebar-color: #4a5d4e;
        --primary: #7c9d96; --success: #a1ccd1; --text-main: #2f3e46; --border: #e8e8e8; --canvas-bg: #fdfbf7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
    body { background-color: var(--bg-app); color: var(--text-main); transition: all 0.3s ease; overflow-x: hidden; }
    .app-container { display: flex; min-height: 100vh; }
    .sidebar { width: 300px; background-color: var(--sidebar-color); color: #ffffff; padding: 25px 15px; display: flex; flex-direction: column; position: fixed; height: 100vh; overflow-y: auto; gap: 20px; z-index: 10; }
    .logo-area { text-align: center; } .logo-icon { font-size: 32px; display: block; }
    .logo-area h2 { font-size: 20px; font-weight: 700; margin-top: 5px; } .logo-area p { color: var(--text-muted); font-size: 12px; }
    .theme-control { display: flex; flex-direction: column; gap: 5px; font-size: 13px; background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: var(--radius-md); }
    .theme-control select { padding: 8px; border-radius: 4px; background: #2d3748; color: #ffffff; border: none; cursor: pointer; }
    .pomodoro-box { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 12px; border-radius: var(--radius-md); text-align: center; }
    #pomodoro-timer { font-size: 26px; font-weight: 800; color: var(--primary); margin: 5px 0; }
    .pomodoro-controls { display: flex; gap: 5px; justify-content: center; }
    .pomodoro-controls button { padding: 6px 10px; font-size: 11px; border: none; background: rgba(255,255,255,0.1); color: #ffffff; border-radius: 4px; cursor: pointer; }
    .nav-menu { display: flex; flex-direction: column; gap: 8px; }
    .nav-btn { background: transparent; border: none; color: #94a3b8; padding: 12px; font-size: 14px; font-weight: 600; border-radius: var(--radius-md); cursor: pointer; text-align: left; }
    .nav-btn.active { background: var(--primary); color: #ffffff; }
    .dashboard-stats { background: rgba(255, 255, 255, 0.02); padding: 15px; border-radius: var(--radius-md); border: 1px solid rgba(255, 255, 255, 0.05); }
    .stat-badge { font-size: 22px; font-weight: 800; color: var(--success); margin-bottom: 12px; }
    .history-table { width: 100%; border-collapse: collapse; font-size: 11px; text-align: left; }
    .history-table th, .history-table td { padding: 6px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2e8f0; }
    .main-content { margin-left: 300px; flex-grow: 1; padding: 35px; width: calc(100% - 300px); }
    .section { display: none; } .section.active-section { display: block; }
    .card-panel { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 25px; box-shadow: var(--shadow); margin-bottom: 20px; }
    .control-group { margin-bottom: 15px; display: flex; flex-direction: column; gap: 6px; }
    .control-group select, .control-group input { padding: 10px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--bg-app); color: var(--text-main); font-size: 14px; }
    .action-btn { padding: 12px 24px; font-size: 14px; font-weight: 600; border-radius: var(--radius-md); cursor: pointer; border: none; }
    .btn-success { background: var(--success); color: #ffffff; } .btn-primary { background: var(--primary); color: #ffffff; }
    .quiz-box { background: var(--bg-app); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; margin-bottom: 15px; }
    .option-label { display: flex; align-items: center; padding: 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; margin-bottom: 6px; }
    .option-label input { margin-right: 10px; }
    .escrita-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; margin-bottom: 15px; }
    .escrita-item textarea { width: 100%; height: 90px; padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--bg-app); color: var(--text-main); margin-bottom: 10px; resize: none; }
    .converter-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; }
    .conv-col { display: flex; flex-direction: column; gap: 6px; background: var(--bg-app); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border); }
    .conv-res { font-weight: bold; color: var(--primary); font-size: 13.5px; }
    .calc-inputs { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin: 15px 0; }
    .calc-inputs input { padding: 10px; border-radius: var(--radius-md); background: var(--bg-app); border: 1px solid var(--border); color: var(--text-main); }
    .canvas-container { background: var(--canvas-bg); border: 2px dashed var(--border); border-radius: var(--radius-md); display: flex; justify-content: center; }
    .editor-split { display: flex; gap: 20px; } .editor-col { width: 50%; display: flex; flex-direction: column; gap: 10px; }
    .editor-col textarea, .markdown-preview-box { height: 320px; padding: 14px; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--bg-app); color: var(--text-main); }
    .flashcards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 15px; }
    .card-scene { height: 220px; perspective: 1000px; }
    .card { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.6s; }
    .card.is-flipped { transform: rotateY(180deg); }
    .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; border-radius: var(--radius-lg); }
    .card-front { background: linear-gradient(135deg, #1e3a8a, var(--primary)); color: #ffffff; font-weight: bold; }
    .card-back { background: var(--bg-card); color: var(--text-main); transform: rotateY(180deg); border: 2px solid var(--primary); font-size: 13.5px; }
    .card-actions-box { display: flex; gap: 4px; width: 100%; margin-top: auto; }
    .card-actions-box button { flex: 1; padding: 6px; font-size: 11px; border: none; border-radius: 4px; cursor: pointer; color: white; font-weight: bold; }
    .btn-easy { background: var(--success); } .btn-medium { background: #f59e0b; } .btn-hard { background: var(--danger); }
    .floating-formula-btn { position: fixed; bottom: 25px; right: 25px; background: var(--primary); color: #ffffff; border: none; padding: 14px 22px; border-radius: 50px; font-weight: bold; cursor: pointer; z-index: 100; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.25s ease; }
    .modal-overlay.open { opacity: 1; pointer-events: auto; }
    .modal-content { background: var(--bg-card); border-radius: var(--radius-lg); width: 90%; max-width: 440px; padding: 22px; }
    .modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
    .close-modal-btn { background: transparent; border: none; font-size: 26px; cursor: pointer; color: var(--text-muted); }
    .modal-topic { margin-bottom: 12px; background: var(--bg-app); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border); }
    .correct-answer { background-color: rgba(16, 185, 129, 0.15) !important; border-color: var(--success) !important; color: var(--success) !important; }
    .wrong-answer { background-color: rgba(239, 68, 68, 0.15) !important; border-color: var(--danger) !important; color: var(--danger) !important; }
    @media (max-width: 900px) { .app-container { flex-direction: column; } .sidebar { width: 100%; height: auto; position: relative; } .main-content { margin-left: 0; width: 100%; } .nav-menu { flex-direction: row; overflow-x: auto; } }
    `;
    const styleTag = document.createElement('style');
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
})();

// ==========================================
// MÓDULO 2: BANCO DE DADOS ACADÊMICO (AULAS)
// ==========================================
const questionBank = [
    { q: "Qual é a unidade de medida do Trabalho Mecânico no Sistema Internacional (SI)?", o: ["Watt (W)", "Newton (N)", "Joule (J)", "Pascal (Pa)"], c: 2 },
    { q: "Quando uma força aplicada em um corpo atua estritamente perpendicular à direção do movimento, qual é o valor do trabalho?", o: ["Máximo positivo", "Máximo negativo", "Nulo", "Depende da massa"], c: 2 },
    { q: "O trabalho motor é caracterizado por qual comportamento físico?", o: ["Força no mesmo sentido do deslocamento", "Força oposta ao deslocamento", "Força perpendicular", "Nenhum deslocamento corporal"], c: 0 },
    { q: "O trabalho resistente ocorre quando:", o: ["A força favorece o movimento", "A força se opõe ao deslocamento", "O corpo permanece imóvel", "A gravidade deixa de atuar"], c: 1 },
    { q: "Um bloco é empurrado por uma força constante de 15 N ao longo de 4 metros na direção do movimento. O trabalho realizado é de:", o: ["60 J", "3.75 J", "19 J", "11 J"], c: 0 },
    { q: "O trabalho da força peso depende exclusivamente de quais fatores?", o: ["Velocidade e tempo", "Massa, gravidade e altura percorrida verticalmente", "Forma da trajetória percorrida", "Aceleração lateral do corpo"], c: 1 },
    { q: "Se um homem segura uma caixa pesada de 50 kg imóvel nos braços por 2 horas, qual o trabalho?", o: ["100 J", "980 J", "0 J", "25 J"], c: 2 },
    { q: "Um corpo de 2 kg cai de uma altura de 5 metros (g = 10 m/s²). O trabalho do peso é:", o: ["10 J", "50 J", "100 J", "-100 J"], c: 2 },
    { q: "O trabalho mecânico pode ser calculado graficamente através de um gráfico de:", o: ["Velocidade por Tempo", "Força por Deslocamento", "Pressão por Temperatura", "Potência por Massa"], c: 1 },
    { q: "Se o ângulo entre a força e o deslocamento for igual a 180°, o trabalho é:", o: ["Nulo", "Motor", "Resistente", "Infinito"], c: 2 },
    { q: "Um carro freia até parar. O trabalho realizado pela força de atrito dos freios é:", o: ["Positivo", "Negativo", "Nulo", "Variável"], c: 1 },
    { q: "A equação geral do trabalho mecânico que inclui a inclinação da força é:", o: ["W = F * d", "W = F / d", "W = F * d * cos(θ)", "W = m * g * h^2"], c: 2 },
    { q: "Quando lançamos uma bola verticalmente para cima, o trabalho do peso na SUBIDA é:", o: ["Positivo", "Negativo", "Nulo", "Igual à potência"], c: 1 },
    { q: "A Potência Mecânica mede fundamentalmente qual grandeza física?", o: ["A força acumulada", "A rapidez com que o trabalho é realizado", "A variação da pressão", "A massa deslocada"], c: 1 },
    { q: "Qual das alternativas representa uma unidade de medida válida para potência?", o: ["Joule por metro", "Watt (W)", "Newton por segundo", "Pascal por segundo"], c: 1 },
    { q: "Um motor realiza um trabalho mecânico de 1200 J em 10 segundos. Qual a potência?", o: ["12000 W", "120 W", "12 W", "0.12 W"], c: 1 },
    { q: "Qual outra equação relaciona diretamente potência com velocidade constante?", o: ["P = F * v", "P = F / v", "P = m * v", "P = W * cos(θ)"], c: 0 },
    { q: "Um guindaste eleva uma carga realizando um trabalho de 5000 J em 2 segundos. A potência é:", o: ["10000 W", "2500 W", "250 W", "5002 W"], c: 1 },
    { q: "Se a potência de uma máquina aumenta no mesmo intervalo de tempo, o trabalho realizado:", o: ["Diminui", "Permanece constante", "Aumenta", "Zera"], c: 2 },
    { q: "Um objeto se desloca a 5 m/s sob ação de uma força constante de 60 N. A potência é:", o: ["12 W", "300 W", "65 W", "0.08 W"], c: 1 },
    { q: "No Sistema Internacional, 1 Watt equivale exatamente a:", o: ["1 N * m", "1 J / s", "1 kg * m/s", "1 Pa / m"], c: 1 },
    { q: "Uma máquina com alta potência executa uma tarefa em relação a uma de baixa potência em:", o: ["Mais tempo", "Menos tempo", "Mesmo tempo", "Depende do volume"], c: 1 },
    { q: "Se convertermos o tempo de minutos para segundos, 3 minutos equivalem a:", o: ["30 s", "120 s", "180 s", "300 s"], c: 2 },
    { q: "Qual o trabalho realizado por uma máquina de potência constante de 50 W em 6 segundos?", o: ["300 J", "8.3 J", "56 J", "11 J"], c: 0 },
    { q: "Um motor de potência de 2 kW equivale em Watts nominais a:", o: ["20 W", "200 W", "2000 W", "0.002 W"], c: 2 },
    { q: "A potência instantânea relaciona graficamente a força com qual grandeza?", o: ["Aceleração", "Velocidade", "Posição", "Momento"], c: 1 },
    { q: "O Rendimento (η) de uma máquina mecânica real é a razão entre:", o: ["Potência Total e Útil", "Potência Útil e Total", "Potência Dissipada e Útil", "Trabalho e Atrito"], c: 1 },
    { q: "Por que o rendimento de uma máquina real NUNCA pode atingir o valor de 100%?", o: ["A gravidade impede", "Devido à perda inevitável de energia por calor/atrito", "A força peso consome tudo", "Por causa dos pistões"], c: 1 },
    { q: "Uma máquina recebe 500 W de potência total e aproveita 400 W. Seu rendimento é:", o: ["90%", "80%", "20%", "40%"], c: 1 },
    { q: "Se uma máquina possui rendimento igual a 0.65, isso expressa que:", o: ["Ela dissipa 65%", "Ela aproveita 65% da energia total", "A potência é de 65W", "A força dobra"], c: 1 },
    { q: "A soma da Potência Útil com a Potência Dissipada resulta em:", o: ["Rendimento líquido", "Trabalho efetivo", "Potência Total fornecida", "Pressão"], c: 2 },
    { q: "Um motor consome 1000 W de potência total e tem rendimento de 70%. Qual a potência útil?", o: ["700 W", "300 W", "1700 W", "70 W"], c: 0 },
    { q: "Se um motor dissipa 200 W de uma potência de entrada de 1000 W, qual o rendimento?", o: ["20%", "50%", "80%", "10%"], c: 2 },
    { q: "O rendimento é uma grandeza física considerada:", o: ["Dimensional", "Adimensional (sem unidade)", "Medida em Watts", "Vetorial"], c: 1 },
    { q: "Em um sistema perfeitamente ideal, o rendimento teórico seria igual a:", o: ["0", "0.5", "1 (ou 100%)", "Infinito"], c: 2 },
    { q: "Uma máquina com rendimento muito baixo caracteriza-se por:", o: ["Ser veloz", "Dissipar muita energia em calor", "Multiplicar forças", "Aumentar a área"], c: 1 },
    { q: "Se a potência útil é metade da potência total, o rendimento vale:", o: ["25%", "50%", "75%", "100%"], c: 1 },
    { q: "Para obter a eficiência em formato de porcentagem (%), devemos multiplicar por:", o: ["10", "60", "100", "1000"], c: 2 },
    { q: "O funcionamento de uma prensa hidráulica baseia-se em qual lei física?", o: ["Lei de Hooke", "Princípio de Pascal", "Princípio de Arquimedes", "Lei de Newton"], c: 1 },
    { q: "O Princípio de Pascal dita que o acréscimo de pressão em um fluido é:", o: ["Diminuído", "Transmitido integralmente a todos os pontos", "Anulado", "Duplicado"], c: 1 },
    { q: "Em uma prensa hidráulica, a relação correta entre forças (F) e áreas (A) é:", o: ["F1 * A1 = F2 * A2", "F1 / A1 = F2 / A2", "F1 + A1 = F2 + A2", "F1 * F2 = A1 * A2"], c: 1 },
    { q: "Uma prensa hidráulica atua fundamentalmente como um dispositivo multiplicador de:", o: ["Energia", "Trabalho", "Força", "Massa"], c: 2 },
    { q: "Se a área do êmbolo maior é 4 vezes maior que a do menor, a força será:", o: ["4 vezes menor", "4 vezes maior", "Igual", "16 vezes maior"], c: 1 },
    { q: "Aplicando 20 N em um êmbolo de área 2 cm², qual a força no maior de área 10 cm²?", o: ["4 N", "100 N", "200 N", "40 N"], c: 1 },
    { q: "Como o trabalho se conserva em uma prensa ideal, o êmbolo maior se move:", o: ["Uma distância maior", "Uma distância menor que o menor", "A mesma distância", "Não se move"], c: 1 },
    { q: "Se a pressão aplicada no primeiro pistão é de 50 Pa, qual a pressão no segundo?", o: ["25 Pa", "50 Pa", "100 Pa", "0 Pa"], c: 1 },
    { q: "Os fluidos utilizados em sistemas hidráulicos industriais devem ser:", o: ["Compressíveis", "Incompressíveis (óleos)", "Gasosos", "Voláteis"], c: 1 },
    { q: "Um elevador hidráulico tem pistões com 1 m² e 5 m². Para erguer 5000 N, a força necessária é:", o: ["1000 N", "5000 N", "25000 N", "500 N"], c: 0 },
    { q: "A pressão mecânica dentro de um fluido hidráulico relaciona quais duas grandezas?", o: ["Massa e Volume", "Força e Área", "Trabalho e Tempo", "Velocidade e Gravidade"], c: 1 },
    { q: "Se o êmbolo menor desce 20 cm, e a força multiplicou por 5, o maior subirá:", o: ["100 cm", "20 cm", "4 cm", "10 cm"], c: 2 }
];

const perguntasEscritas = [
    { q: "1. Sob quais condições físicas uma força realiza um trabalho igual a ZERO?", resp: "GABARITO: Se não houver deslocamento (d=0) ou se a força for perpendicular ao movimento (ângulo de 90°, cos(90°)=0)." },
    { q: "2. Explique a diferença prática entre Trabalho Mecânico e Potência Mecânica.", resp: "GABARITO: O Trabalho mede a quantidade de energia transferida. A Potência mede a rapidez com que essa energia é transferida no tempo." },
    { q: "3. Por que o rendimento de uma máquina real é sempre menor que 100%?", resp: "GABARITO: Devido ao atrito mecânico e à resistência interna que convertem parte da energia total em calor dissipado não reaproveitável." },
    { q: "4. Descreva o Princípio de Pascal aplicado a um elevador hidráulico.", resp: "GABARITO: A pressão aplicada em um ponto se distribui igualmente. Como P=F/A, se aumentarmos a área do segundo pistão, a força resultante cresce na mesma proporção." }
];

const flashcardsDados = [
    { f: "Fórmula Geral do Trabalho Mecânico", v: "W = F · d · cos(θ)<br><br>W = Trabalho (J)<br>F = Força (N)<br>d = Deslocamento (m)" },
    { f: "Trabalho da Força Peso (Gravidade)", v: "W_peso = m · g · h<br><br>(+) na descida (motor)<br>(-) na subida (resistente)" },
    { f: "Equação Base da Potência Média", v: "P = W / Δt<br><br>P = Potência em Watts (W)<br>W = Trabalho (J)<br>Δt = Tempo (s)" },
    { f: "Potência Relacionada à Velocidade", v: "P = F · v<br><br>F = Força aplicada (N)<br>v = Velocidade constante (m/s)" },
    { f: "Equação Matemática do Rendimento (η)", v: "η = P_útil / P_total
        Valor adimensional entre 0 e 1.}
        Multiplique por 100 para obter %." },
        { f: "Equação de Equilíbrio da Prensa Hidráulica", v: "F1 / A1 = F2 / A2 Baseada na igualdade de pressão (P1 = P2) do Princípio de Pascal." } 
            ];
            // ==========================================
// MÓDULO 3: LÓGICA DE INTERFACE E PRODUTIVIDADE
// ==========================================
let currentQuizQuestions = [];
let multiplayerState = { active: false, player1Score: 0, player2Score: 0, currentTurn: 1 };
let pomodoroInterval = null, pomodoroTimeLeft = 25 * 60, isDrawing = false, canvas, ctx;

function switchTab(sectionId, element) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active-section');
    element.classList.add('active');
    if(sectionId === 'tools-sect') initWhiteboard();
}

function changeTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('fisica_theme_pref', themeName);
}

function openFormulaModal() { document.getElementById('formula-modal').classList.add('open'); }
function closeFormulaModal(e, force = false) {
    if (force || e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal-btn')) {
        document.getElementById('formula-modal').classList.remove('open');
    }
}

function updatePomodoroDisplay() {
    let min = Math.floor(pomodoroTimeLeft / 60).toString().padStart(2, '0');
    let sec = (pomodoroTimeLeft % 60).toString().padStart(2, '0');
    document.getElementById('pomodoro-timer').innerText = `${min}:${sec}`;
}
function startPomodoro() {
    if (pomodoroInterval) return;
    document.getElementById('pomodoro-status').innerText = "Status: Focado!";
    pomodoroInterval = setInterval(() => {
        if (pomodoroTimeLeft > 0) { pomodoroTimeLeft--; updatePomodoroDisplay(); } 
        else { clearInterval(pomodoroInterval); pomodoroInterval = null; alert("Foco Concluído!"); pomodoroTimeLeft = 25 * 60; updatePomodoroDisplay(); }
    }, 1000);
}
function pausePomodoro() { clearInterval(pomodoroInterval); pomodoroInterval = null; document.getElementById('pomodoro-status').innerText = "Status: Pausado"; }
function resetPomodoro() { pausePomodoro(); pomodoroTimeLeft = 25 * 60; updatePomodoroDisplay(); document.getElementById('pomodoro-status').innerText = "Status: Pronto"; }
// ==========================================
// MÓDULO 4: LABORATÓRIOS E SIMULADORES MATEMÁTICOS
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
    if(!container) return; container.innerHTML = '';
    if (f === 'trabalho') {
        container.innerHTML = `<div><label>Força (N):</label><input type="number" id="c-f" value="10"></div>
        <div><label>Deslocamento (m):</label><input type="number" id="c-d" value="5"></div>
        <div><label>Ângulo θ (°):</label><input type="number" id="c-ang" value="0"></div>`;
    } else if (f === 'potencia') {
        container.innerHTML = `<div><label>Trabalho (J):</label><input type="number" id="c-w" value="500"></div>
        <div><label>Tempo Δt (s):</label><input type="number" id="c-t" value="10"></div>`;
    } else if (f === 'hidraulica') {
        container.innerHTML = `<div><label>Força 1 (N):</label><input type="number" id="c-f1" value="50"></div>
        <div><label>Área 1 (cm²):</label><input type="number" id="c-a1" value="2"></div>
        <div><label>Área 2 (cm²):</label><input type="number" id="c-a2" value="10"></div>`;
    }
}

function executeStepByStepCalculation() {
    const f = document.getElementById('calc-formula-select').value;
    const resBox = document.getElementById('calc-step-result'); resBox.style.display = 'block';
    if (f === 'trabalho') {
        let force = parseFloat(document.getElementById('c-f').value) || 0, dist = parseFloat(document.getElementById('c-d').value) || 0, angDeg = parseFloat(document.getElementById('c-ang').value) || 0;
        let r = force * dist * Math.cos(angDeg * (Math.PI / 180));
        resBox.innerHTML = `1. W = F · d · cos(θ) ➜ 2. W = ${force} · ${dist} · cos(${angDeg}°) ➜ <strong>Resultado: W = ${r.toFixed(2)} J</strong>`;
    } else if (f === 'potencia') {
        let w = parseFloat(document.getElementById('c-w').value) || 0, t = parseFloat(document.getElementById('c-t').value) || 1;
        resBox.innerHTML = `1. P = W / Δt ➜ 2. P = ${w} / ${t} ➜ <strong>Resultado: P = ${(w/t).toFixed(2)} W</strong>`;
    } else if (f === 'hidraulica') {
        let f1 = parseFloat(document.getElementById('c-f1').value) || 0, a1 = parseFloat(document.getElementById('c-a1').value) || 1, a2 = parseFloat(document.getElementById('c-a2').value) || 1;
        resBox.innerHTML = `1. F1/A1 = F2/A2 ➜ 2. ${f1}/${a1} = F2/${a2} ➜ <strong>Resultado: F2 = ${((f1/a1)*a2).toFixed(2)} N</strong>`;
    }
}

function initWhiteboard() {
    canvas = document.getElementById('whiteboard'); if(!canvas) return; ctx = canvas.getContext('2d');
    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'claro' ? '#334155' : '#f1f5f9';
    ctx.lineWidth = 2; ctx.lineCap = 'round';
    canvas.onmousedown = (e) => { isDrawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); };
    canvas.onmousemove = (e) => { if(isDrawing) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); } };
    canvas.onmouseup = () => { isDrawing = false; };
}
function clearWhiteboard() { if(ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); }

function processAndSaveNotes() {
    let rawText = document.getElementById('markdown-input').value; localStorage.setItem('fisica_markdown_notes', rawText);
    let html = rawText.replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/^## (.*$)/gim, '<h2>$1</h2>').replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>').replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    document.getElementById('markdown-preview').innerHTML = html;
}
// ==========================================
// MÓDULO 5: SIMULADOS, HISTÓRICOS E PERSISTÊNCIA
// ==========================================
function toggleMultiplayerSetup() { document.getElementById('multiplayer-names').style.display = (document.getElementById('quiz-mode').value === 'multi') ? 'block' : 'none'; }

function startQuiz() {
    document.getElementById('quiz-init').style.display = 'none'; document.getElementById('quiz-game').style.display = 'block'; document.getElementById('quiz-results').style.display = 'none';
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
    multiplayerState.currentTurn = 1; multiplayerState.player1Score = 0; multiplayerState.player2Score = 0;
    renderQuizScreen();
}

function renderQuizScreen() {
    const indicator = document.getElementById('multiplayer-turn-indicator');
    if (multiplayerState.active) {
        indicator.style.display = 'block';
        let p1 = document.getElementById('player1-name').value || "Jogador 1", p2 = document.getElementById('player2-name').value || "Jogador 2";
        indicator.innerText = `🎮 Vez de: ${multiplayerState.currentTurn === 1 ? p1 : p2}`;
    } else { indicator.style.display = 'none'; }
    const area = document.getElementById('questions-area'); area.innerHTML = '';
    currentQuizQuestions.forEach((item, idx) => {
        let optionsHTML = '';
        item.o.forEach((opt, oIdx) => { optionsHTML += `<label class="option-label" id="label-q${idx}-o${oIdx}"><input type="radio" name="question${idx}" value="${oIdx}"> ${String.fromCharCode(65 + oIdx)}) ${opt}</label>`; });
        area.innerHTML += `<div class="quiz-box" id="quiz-box-${idx}"><div class="question-text">Questão ${idx + 1}: ${item.q}</div><div class="options-container">${optionsHTML}</div></div>`;
    });
}

function correctQuiz() {
    let score = 0, feedbackIA = "";
    currentQuizQuestions.forEach((item, idx) => {
        const selected = document.querySelector(`input[name="question${idx}"]:checked`);
        for (let i = 0; i < 4; i++) { if(document.getElementById(`label-q${idx}-o${i}`)) document.getElementById(`label-q${idx}-o${i}`).classList.remove('correct-answer', 'wrong-answer'); }
        if(document.getElementById(`label-q${idx}-o${item.c}`)) document.getElementById(`label-q${idx}-o${item.c}`).classList.add('correct-answer');
        if (selected) {
            let ans = parseInt(selected.value);
            if (ans === item.c) { score++; } 
            else { 
                if(document.getElementById(`label-q${idx}-o${ans}`)) document.getElementById(`label-q${idx}-o${ans}`).classList.add('wrong-answer');
                if(item.q.includes("Pascal")) feedbackIA += `⚠️ Q${idx+1}: Lembra que forças e áreas crescem juntas na hidráulica!<br>`;
            }
        }
    });

    if (multiplayerState.active) {
        let p1 = document.getElementById('player1-name').value || "Jogador 1", p2 = document.getElementById('player2-name').value || "Jogador 2";
        if (multiplayerState.currentTurn === 1) {
            multiplayerState.player1Score = score; alert(`Turno de ${p1} encerrado! Passe para ${p2}.`);
            multiplayerState.currentTurn = 2; document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false); renderQuizScreen();
        } else {
            multiplayerState.player2Score = score; const resBox = document.getElementById('quiz-results'); resBox.style.display = 'block';
            let v = multiplayerState.player1Score > multiplayerState.player2Score ? p1 : p2; if(multiplayerState.player1Score === multiplayerState.player2Score) v = "Empate!";
            resBox.innerHTML = `<h3>🏁 Fim!</h3><p>${p1}: ${multiplayerState.player1Score}</p><p>${p2}: ${multiplayerState.player2Score}</p><h4>🏆 Vencedor: ${v}</h4>`;
        }
    } else {
        saveQuizAttemptToHistory(score); updateHighScore(score);
        document.getElementById('quiz-results').style.display = 'block';
        document.getElementById('quiz-results').innerHTML = `<h3>Simulado Concluído!</h3><p>Você acertou ${score} de 10 questões.</p><div style="text-align:left;font-size:12px;margin-top:10px;">${feedbackIA}</div>`;
        document.getElementById('challenge-share-zone').style.display = 'block';
    }
}

function generateChallengeLink() {
    const score = localStorage.getItem('fisica_last_score') || 0;
    window.open(`https://whatsapp.com{encodeURIComponent(`Fiz ${score * 10}% no simulado profissional de Física! Te desafio: ${window.location.href}`)}`);
}

function rateFlashcard(idx, rating) {
    let memoryLog = JSON.parse(localStorage.getItem('fisica_flashcards_memory')) || {}; memoryLog[idx] = rating;
    localStorage.setItem('fisica_flashcards_memory', JSON.stringify(memoryLog)); loadFlashcards();
}

function loadFlashcards() {
    const area = document.getElementById('flashcards-area'); if (!area || typeof flashcardsDados === 'undefined') return;
    let memoryLog = JSON.parse(localStorage.getItem('fisica_flashcards_memory')) || {};
    let cardsOrdenados = flashcardsDados.map((item, index) => ({...item, originalIdx: index})).sort((a, b) => {
        let wA = memoryLog[a.originalIdx] === 'hard' ? 2 : (memoryLog[a.originalIdx] === 'medium' ? 1 : 0);
        let wB = memoryLog[b.originalIdx] === 'hard' ? 2 : (memoryLog[b.originalIdx] === 'medium' ? 1 : 0);
        return wB - wA;
    });
    area.innerHTML = '';
    cardsOrdenados.forEach((item) => {
        let status = memoryLog[item.originalIdx] ? `<span style="font-size:10px; opacity:0.7;">[Revisão: ${memoryLog[item.originalIdx]}]</span>` : '';
        area.innerHTML += `<div class="card-scene">
            <div class="card" id="fc-${item.originalIdx}">
                <div class="card-face card-front" onclick="document.getElementById('fc-${item.originalIdx}').classList.toggle('is-flipped')"><div>${item.f}<br>${status}</div></div>
                <div class="card-face card-back">
                    <div onclick="document.getElementById('fc-${item.originalIdx}').classList.toggle('is-flipped')">${item.v}</div>
                    <div class="card-actions-box">
                        <button class="btn-easy" onclick="rateFlashcard(${item.originalIdx}, 'easy')">Fácil</button>
                        <button class="btn-medium" onclick="rateFlashcard(${item.originalIdx}, 'medium')">Médio</button>
                        <button class="btn-hard" onclick="rateFlashcard(${item.originalIdx}, 'hard')">Difícil</button>
                    </div>
                </div>
            </div>
        </div>`;
    });
}

function loadEscritas() {
    const area = document.getElementById('escritas-area'); if (!area || typeof perguntasEscritas === 'undefined') return; area.innerHTML = '';
    perguntasEscritas.forEach((item, idx) => {
        area.innerHTML += `<div class="escrita-item"><h3>${item.q}</h3><textarea placeholder="Sua resposta..."></textarea>
            <button class="gabarito-btn" onclick="toggleGabarito(${idx})">Gabarito Sugerido</button>
            <div class="resposta-esperada" id="gabarito-${idx}">${item.resp}</div></div>`;
    });
}
function toggleGabarito(idx) { const el = document.getElementById(`gabarito-${idx}`); if(el) el.style.display = (el.style.display === 'block') ? 'none' : 'block'; }

function saveQuizAttemptToHistory(score) {
    localStorage.setItem('fisica_last_score', score); let logs = JSON.parse(localStorage.getItem('fisica_quiz_logs')) || [];
    let now = new Date(); let timeStr = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')} às ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    logs.unshift({ date: timeStr, score: score }); if(logs.length > 5) logs.pop();
    localStorage.setItem('fisica_quiz_logs', JSON.stringify(logs)); renderHistoryTable();
}
function renderHistoryTable() {
    let logs = JSON.parse(localStorage.getItem('fisica_quiz_logs')) || []; const tbody = document.getElementById('history-log'); if(!tbody) return;
    tbody.innerHTML = logs.length === 0 ? `<tr><td colspan="2">Nenhum teste realizado</td></tr>` : logs.map(l => `<tr><td>${l.date}</td><td><strong>${l.score}/10</strong></td></tr>`).join('');
}
function loadHighScore() { const saved = localStorage.getItem('fisica_high_score'); if (saved !== null) document.getElementById('best-score').innerText = saved; }
function updateHighScore(score) {
    const current = localStorage.getItem('fisica_high_score') || 0;
    if (score > parseInt(current)) { localStorage.setItem('fisica_high_score', score); document.getElementById('best-score').innerText = score; }
}
function calculateExamSchedule() {
    let dateVal = document.getElementById('exam-date-input').value; if(!dateVal) return; localStorage.setItem('fisica_exam_date', dateVal);
    let diffDays = Math.ceil((new Date(dateVal + "T00:00:00") - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
    const msgBox = document.getElementById('scheduler-message');
    if(msgBox) msgBox.innerHTML = diffDays < 0 ? `🏁 A data informada já passou!` : (diffDays === 0 ? `🚨 É hoje a prova!` : `⏳ Faltam <strong>${diffDays} dias</strong>. Meta: Faça 1 simulado.`);
}

// Inicializador executado automaticamente pelo ciclo de carregamento global do bundle
(function iniciarAmbienteGeral() {
    loadHighScore(); renderHistoryTable(); toggleCalcFields(); loadEscritas(); loadFlashcards(); updatePomodoroDisplay();
})();
