// VARIÁVEL GLOBAL PARA ARMAZENAR AS 10 QUESTÕES SORTEADAS NO SIMULADO ATUAL
let currentQuizQuestions = [];

/**
 * 1. GERENCIAMENTO DE NAVEGAÇÃO (ABAS)
 * Alterna visualmente entre as seções do painel lateral.
 */
function switchTab(sectionId, element) {
    // Esconde todas as seções
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
    // Remove o estado ativo de todos os botões do menu
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Mostra a seção clicada e ativa o respectivo botão
    document.getElementById(sectionId).classList.add('active-section');
    element.classList.add('active');
}

/**
 * 2. LÓGICA DO QUIZ DINÂMICO
 * Sorteia aleatoriamente 10 perguntas das 50 contidas no array unificado.
 */
function startQuiz() {
    // Garante que o banco de dados unificado existe e tem dados
    if (typeof questionBank === 'undefined' || questionBank.length === 0) {
        console.error("Erro: O banco de dados unificador.js não foi carregado corretamente.");
        return;
    }

    // Altera a exibição das telas do simulado
    document.getElementById('quiz-init').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';

    // Algoritmo de embaralhamento rápido (Shuffling)
    let shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    // Seleciona apenas as primeiras 10 perguntas embaralhadas
    currentQuizQuestions = shuffled.slice(0, 10);

    const area = document.getElementById('questions-area');
    area.innerHTML = '';

    // Renderiza as 10 perguntas sorteadas na tela
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

/**
 * 3. CORREÇÃO E VALIDAÇÃO DO SIMULADO
 * Compara as respostas do usuário com o gabarito oficial e aplica o estilo CSS.
 */
function correctQuiz() {
    let acertos = 0;
    
    currentQuizQuestions.forEach((item, idx) => {
        const selected = document.querySelector(`input[name="question${idx}"]:checked`);
        const correctAnswerIdx = item.c;
        
        // Limpa estilos de correções anteriores
        for(let i = 0; i < 4; i++) {
            const labelEl = document.getElementById(`label-q${idx}-o${i}`);
            if(labelEl) labelEl.classList.remove('correct-answer', 'wrong-answer');
        }

        // Destaca a alternativa correta em verde
        const correctLabel = document.getElementById(`label-q${idx}-o${correctAnswerIdx}`);
        if(correctLabel) correctLabel.classList.add('correct-answer');

        if (selected) {
            let userAns = parseInt(selected.value);
            if (userAns === correctAnswerIdx) {
                acertos++;
            } else {
                // Se o usuário errou, destaca a escolha dele em vermelho
                const wrongLabel = document.getElementById(`label-q${idx}-o${userAns}`);
                if(wrongLabel) wrongLabel.classList.add('wrong-answer');
            }
        } else {
            // Se o usuário deixou em branco, coloca uma borda vermelha no bloco da questão
            const quizBox = document.getElementById(`quiz-box-${idx}`);
            if(quizBox) quizBox.style.borderColor = 'var(--danger)';
        }
    });

    // Envia o resultado para verificar e atualizar o recorde no LocalStorage
    updateHighScore(acertos);

    // Exibe o painel de resultados detalhado
    const resBox = document.getElementById('quiz-results');
    resBox.style.display = 'block';
    resBox.innerHTML = `
        <h3>Simulado Concluído!</h3>
        <p style="font-size: 18px; margin: 10px 0; font-weight: bold;">Você acertou ${acertos} de 10 questões (${acertos * 10}%).</p>
        <button class="action-btn btn-success" style="margin-top:10px;" onclick="startQuiz()">Tentar Novamente (Novo Sorteio)</button>
    `;
    
    // Desloca a página suavemente até o painel de resultados
    resBox.scrollIntoView({ behavior: 'smooth' });
}

/**
 * 4. SITEMA DE HISTÓRICO E RECORDE (LOCALSTORAGE)
 * Salva e recupera a pontuação máxima diretamente na memória interna do navegador.
 */
function loadHighScore() {
    const savedScore = localStorage.getItem('fisica_high_score');
    if (savedScore !== null) {
        document.getElementById('best-score').innerText = savedScore;
    }
}

function updateHighScore(score) {
    const currentHighScore = localStorage.getItem('fisica_high_score') || 0;
    // Se a pontuação atual for maior que o recorde antigo, atualiza
    if (score > parseInt(currentHighScore)) {
        localStorage.setItem('fisica_high_score', score);
        document.getElementById('best-score').innerText = score;
    }
}

/**
 * 5. CARREGAMENTO COMPLEMENTAR
 * Renderiza as perguntas discursivas e os flashcards interativos na tela.
 */
function loadEscritas() {
    const area = document.getElementById('escritas-area');
    if (!area || typeof perguntasEscritas === 'undefined') return;
    
    area.innerHTML = '';
    perguntasEscritas.forEach((item, idx) => {
        area.innerHTML += `
            <div class="escrita-item">
                <h3>${item.q}</h3>
                <textarea placeholder="Redija aqui sua resposta analítica para conferência..."></textarea>
                <button class="gabarito-btn" onclick="toggleGabarito(${idx})">Checar Gabarito Sugerido</button>
                <div class="resposta-esperada" id="gabarito-${idx}">${item.resp}</div>
            </div>
        `;
    });
}

function toggleGabarito(idx) {
    const el = document.getElementById(`gabarito-${idx}`);
    if(el) {
        el.style.display = (el.style.display === 'block') ? 'none' : 'block';
    }
}

function loadFlashcards() {
    const area = document.getElementById('flashcards-area');
    if (!area || typeof flashcardsDados === 'undefined') return;
    
    area.innerHTML = '';
    flashcardsDados.forEach((item, idx) => {
        area.innerHTML += `
            <div class="card-scene" onclick="this.querySelector('.card').classList.toggle('is-flipped')">
                <div class="card">
                    <div class="card-face card-front">
                        ${item.f}
                    </div>
                    <div class="card-face card-back">
                        ${item.v}
                    </div>
                </div>
            </div>
        `;
    });
}

/**
 * 6. INICIALIZADOR DA APLICAÇÃO
 * Executa as funções essenciais assim que o navegador termina de ler a estrutura do site.
 */
window.onload = function() {
    loadHighScore();
    loadEscritas();
    loadFlashcards();
};
