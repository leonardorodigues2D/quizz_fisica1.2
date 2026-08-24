#  E-Learn | Plataforma de Estudos Baseada em Engenharia Reversa (Física)

Uma plataforma web responsiva, modular e de alta performance desenvolvida para otimizar o estudo de Física da 2ª Série do Ensino Médio. O sistema processa roteiros pedagógicos e os transforma em um ecossistema ativo de aprendizagem com simulados aleatórios dinâmicos, questões dissertativas com gabarito imediato e memorização por flashcards 3D.

---

##  Funcionalidades Principais

- **Simulado Dinâmico Inteligente:** Toda vez que um teste é gerado, o motor lógico seleciona aleatoriamente **10 questões de um banco de dados composto por 50 perguntas** exclusivas.
- **Persistência de Dados (Histórico Local):** Integração nativa com a API `LocalStorage` do navegador, mantendo o seu recorde de acertos (High Score) salvo mesmo se fechar a aba ou reiniciar o dispositivo.
- **Ambiente Analítico Discursivo:** Seção dedicada a perguntas escritas com checagem de gabarito detalhado em tempo real para simular provas oficiais.
- **Card-Flipping 3D:** Flashcards interativos utilizando propriedades modernas de animação CSS (`perspective` e `backface-visibility`) para memorização de fórmulas.
- **Design Responsivo Avançado:** Interface em padrão Dashboard minimalista com adaptação fluida para Desktop, Tablets e Smartphones.

---

##  Tecnologias Utilizadas

O desenvolvimento priorizou o uso de tecnologias nativas (Vanilla) para garantir máxima performance, SEO simplificado e carregamento instantâneo offline:

- **HTML5:** Estruturação semântica avançada.
- **CSS3:** Layout estruturado via *Flexbox* e *Grid*, variáveis globais (`:root`) e animações 3D.
- **JavaScript (ES6+):** Programação assíncrona, manipulação dinâmica do DOM, algoritmo de embaralhamento e persistência de dados local.

---

##  Arquitetura e Organização do Repositório

O projeto segue as melhores práticas de engenharia de software, separando a folha de estilos, a estrutura de visualização, o motor analítico e os dados em módulos independentes:

```text
 seu-repositorio-github/
├── 📄 index.html          # Ponto de entrada estrutural e árvore do DOM
├── 📄 style.css           # Design do sistema, responsividade e efeitos 3D
├── 📄 README.md           # Documentação técnica oficial da aplicação
└── 📁 js/                 # Diretório exclusivo de lógica e dados
    ├── 📄 app.js          # Roteador de abas, motor do quiz e LocalStorage
    ├── 📄 unificador.js   # Arquivo centralizador de arrays de dados
    ├── 📄 aula30.js       # Banco de dados: Trabalho Mecânico I
    ├── 📄 aula31.js       # Banco de dados: Trabalho Mecânico II e Discursivas
    ├── 📄 aula32.js       # Banco de dados: Potência Mecânica
    ├── 📄 aula33.js       # Banco de dados: Rendimento Mecânico
    └── 📄 aula34.js       # Banco de dados: Sistemas Hidráulicos e Flashcards
```

---

## Matriz de Conteúdo Pedagógico

O ecossistema divide o progresso do estudante através dos seguintes tópicos oficiais mapeados:

| Código | Tópico Acadêmico | Escopo do Conteúdo | Recursos Disponíveis |
| :--- | :--- | :--- | :--- |
| **Aula 30** | Trabalho Mecânico I | Definição, Trabalho Motor, Trabalho Resistente | Quizzes Objetivos |
| **Aula 31** | Trabalho Mecânico II | Aplicação da Força Peso e Gráficos Vetoriais | Exercícios Dissertativos |
| **Aula 32** | Potência Mecânica | Taxa de conversão de energia no tempo e velocidade | Quizzes Objetivos |
| **Aula 33** | Rendimento | Relação de potência útil, total e energia dissipada | Quizzes Objetivos |
| **Aula 34** | Sistemas Hidráulicos | Princípio de Pascal e multiplicação física de forças | Flashcards de Fórmulas |
---
Desenvolvido com foco em alta performance e metodologias ativas de estudo. 
