// Dados brutos padronizados do 9º Ano
const dadosBoletim = [
  { disciplina: "Língua Portuguesa", tri1: 78, tri2: "8,2", tri3: 8.6, faltas: [2, 2, 1] },
  { disciplina: "Matemática", tri1: 55, tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências", tri1: 84, tri2: 7.9, tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História", tri1: "7,1", tri2: 82, tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia", tri1: 69, tri2: "7,5", tri3: 7.8, faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 88, tri2: 8.4, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte", tri1: "9,2", tri2: 87, tri3: 9.0, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 96, tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 91, tri2: 8.9, tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira", tri1: 76, tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática", tri1: 58, tri2: "5,9", tri3: 6.2, faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: 72, tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 49, tri2: 5.5, tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento", tri1: "8,0", tri2: 84, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais", tri1: 64, tri2: "6,6", tri3: 7.0, faltas: [1, 1, 1] }
];

/**
 * Função para normalizar qualquer formato de nota para a escala de 0 a 10
 */
function normalizarNota(valor) {
  // Se for vazio, null ou undefined, a nota ainda não foi lançada
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Converte para texto e troca vírgula por ponto
  let str = String(valor).replace(",", ".").trim();
  let num = parseFloat(str);

  // Se não for um número válido, retorna null
  if (isNaN(num)) {
    return null;
  }

  // Valores maiores que 10 e <= 100 são divididos por 10
  if (num > 10 && num <= 100) {
    num = num / 10;
  }

  // Se o valor estiver fora de 0 a 10, é considerado inválido
  if (num < 0 || num > 10) {
    return null;
  }

  return num;
}

/**
 * Formata a exibição da nota na tabela
 */
function formatarExibicaoNota(nota) {
  if (nota === null) {
    return "—";
  }
  return nota.toFixed(1).replace(".", ",");
}

/**
 * Função principal que processa os dados e desenha a tela (DOM)
 */
function renderizarBoletim() {
  const tbody = document.getElementById("tabela-boletim");
  tbody.innerHTML = "";

  let acumuladorMedias = 0;
  let totalDisciplinasComMedia = 0;
  let totalFaltasGeral = 0;
  let qtdBomDesempenho = 0;
  let qtdAtencao = 0;

  // forEach passa por cada uma das 15 disciplinas
  dadosBoletim.forEach(item => {
    // Normaliza as notas dos três trimestres
    const n1 = normalizarNota(item.tri1);
    const n2 = normalizarNota(item.tri2);
    const n3 = normalizarNota(item.tri3);

    // Calcula a média ignorando notas ausentes (null)
    const notasValidas = [n1, n2, n3].filter(n => n !== null);
    let media = null;
    let situacaoTexto = "Nota ainda não disponível";
    let situacaoClasse = "status-indisponivel";

    if (notasValidas.length > 0) {
      const soma = notasValidas.reduce((acc, curr) => acc + curr, 0);
      media = soma / notasValidas.length;

      acumuladorMedias += media;
      totalDisciplinasComMedia++;

      if (media >= 6.0) {
        situacaoTexto = "Bom desempenho";
        situacaoClasse = "status-bom";
        qtdBomDesempenho++;
      } else {
        situacaoTexto = "Atenção";
        situacaoClasse = "status-atencao";
        qtdAtencao++;
      }
    }

    // Soma as faltas da disciplina
    const totalFaltasDisciplina = item.faltas.reduce((acc, curr) => acc + curr, 0);
    totalFaltasGeral += totalFaltasDisciplina;

    // Cria a linha da tabela no HTML via JS (DOM)
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.disciplina}</strong></td>
      <td>${formatarExibicaoNota(n1)}</td>
      <td>${formatarExibicaoNota(n2)}</td>
      <td>${formatarExibicaoNota(n3)}</td>
      <td><strong>${media !== null ? media.toFixed(1).replace(".", ",") : "—"}</strong></td>
      <td>${totalFaltasDisciplina}</td>
      <td class="${situacaoClasse}">${situacaoTexto}</td>
    `;
    tbody.appendChild(tr);
  });

  // Atualiza os Cards de Resumo na tela
  const mediaGeralGlobal = totalDisciplinasComMedia > 0 
    ? (acumuladorMedias / totalDisciplinasComMedia).toFixed(1).replace(".", ",")
    : "—";

  document.getElementById("media-geral").textContent = mediaGeralGlobal;
  document.getElementById("total-faltas").textContent = totalFaltasGeral;
  document.getElementById("bom-desempenho").textContent = qtdBomDesempenho;
  document.getElementById("precisa-atencao").textContent = qtdAtencao;

  // NOTA: A frequência de 92% é apenas demonstrativa/fictícia nesta etapa do projeto
}

// Executa a função assim que a página carrega
renderizarBoletim();