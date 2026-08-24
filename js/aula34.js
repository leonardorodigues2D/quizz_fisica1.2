const bancoHidraulica = [
    { q: "O funcionamento integrado de uma prensa hidráulica baseia-se fundamentalmente em qual lei física?", o: ["Lei de Hooke", "Princípio de Pascal", "Princípio de Arquimedes", "Lei de Newton da Gravitação"], c: 1 },
    { q: "O Princípio de Pascal dita que o acréscimo de pressão exercido em um ponto de um fluido incompressível é:", o: ["Diminuído proporcionalmente à área", "Transmitido integralmente a todos os pontos do fluido", "Anulado pelas paredes do vaso condutor", "Duplicado a cada metro quadrado"], c: 1 },
    { q: "Em uma prensa hidráulica, a relação correta entre forças (F) e áreas (A) dos dois êmbolos é dada por:", o: ["F1 * A1 = F2 * A2", "F1 / A1 = F2 / A2", "F1 + A1 = F2 + A2", "F1 * F2 = A1 * A2"], c: 1 },
    { q: "Uma prensa hidráulica atua fundamentalmente como um dispositivo multiplicador de:", o: ["Energia mecânica", "Trabalho líquido", "Força", "Massa volumétrica"], c: 2 },
    { q: "Se a área do êmbolo maior de uma prensa é 4 vezes maior que a área do menor, a força transmitida será:", o: ["4 vezes menor", "4 vezes maior", "Igual à original", "16 vezes maior"], c: 1 },
    { q: "Aplicando uma força de 20 N em um êmbolo de área 2 cm², qual a força gerada no êmbolo maior de área 10 cm²?", o: ["4 N", "100 N", "200 N", "40 N"], c: 1 },
    { q: "Como o trabalho mecânico se conserva nos dois lados de uma prensa hidráulica ideal, o êmbolo maior se move:", o: ["Uma distância maior que o menor", "Uma distância menor que o menor", "A exata mesma distância que o menor", "Ele não se desloca"], c: 1 },
    { q: "Se a pressão aplicada no primeiro pistão de um sistema fechado é de 50 Pa, qual a pressão no segundo pistão?", o: ["25 Pa", "50 Pa", "100 Pa", "0 Pa"], c: 1 },
    { q: "Os fluidos utilizados em sistemas mecânicos hidráulicos industriais (como freios de carros) devem ser preferencialmente:", o: ["Altamente compressíveis", "Incompressíveis (como óleos específicos)", "Gasosos expandidos", "Voláteis e inflamáveis"], c: 1 },
    { q: "Um elevador hidráulico possui pistões com áreas de 1 m² e 5 m². Para erguer um carro de 5000 N, a força necessária é:", o: ["1000 N", "5000 N", "25000 N", "500 N"], c: 0 },
    { q: "A pressão mecânica fundamental dentro de um fluido hidráulico relaciona quais duas grandezas?", o: ["Massa e Volume", "Força e Área", "Trabalho e Tempo", "Velocidade e Gravidade"], c: 1 },
    { q: "Se empurrarmos o êmbolo menor por uma distância de 20 cm, e a força foi multiplicada por 5 no maior, o maior subirá:", o: ["100 cm", "20 cm", "4 cm", "10 cm"], c: 2 }
];

const flashcardsDados = [
    { f: "Fórmula Geral do Trabalho Mecânico", v: "W = F · d · cos(θ)<br><br>W = Trabalho (J)<br>F = Força (N)<br>d = Deslocamento (m)<br>θ = Ângulo" },
    { f: "Trabalho da Força Peso (Gravidade)", v: "W_peso = m · g · h<br><br>Sinal (+) na descida (motor)<br>Sinal (-) na subida (resistente)" },
    { f: "Equação Base da Potência Média", v: "P = W / Δt<br><br>P = Potência em Watts (W)<br>W = Trabalho em Joules (J)<br>Δt = Tempo em Segundos (s)" },
    { f: "Potência Relacionada à Velocidade", v: "P = F · v<br><br>F = Força aplicada (N)<br>v = Velocidade constante (m/s)" },
    { f: "Equação Matemática do Rendimento (η)", v: "η = P_útil / P_total<br><br>Valor adimensional entre 0 e 1.<br>Multiplique por 100 para obter em %." },
    { f: "Equação de Equilíbrio da Prensa Hidráulica", v: "F1 / A1 = F2 / A2<br><br>Baseada na igualdade de pressão (P1 = P2) do Princípio de Pascal." }
];
