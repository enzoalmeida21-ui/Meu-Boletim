// Dados brutos padronizados do 9º Ano
const dadosBoletim = [
// Dados atualizados a partir da tabela fornecida
  { disciplina: "Língua Portuguesa", tri1: "6,4", tri2: "6,4", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Matemática", tri1: "3,6", tri2: "7,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Ciências", tri1: "8,6", tri2: "7,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "História", tri1: "8,4", tri2: "10,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Geografia", tri1: "7,2", tri2: "7,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Língua Inglesa", tri1: "6,0", tri2: "2,1", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Arte", tri1: "7,7", tri2: "6,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Educação Física", tri1: "6,8", tri2: "7,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Educação Digital", tri1: "7,0", tri2: "7,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Educação Financeira", tri1: "6,0", tri2: "60,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Rec. Aprend. Matemática", tri1: "4,8", tri2: "9,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: "7,0", tri2: "9,2", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Pensamento Lógico", tri1: "6,0", tri2: "6,0", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Literatura Arte e Movimento", tri1: "6,5", tri2: "6,5", tri3: null, faltas: [0, 0, 0] },
  { disciplina: "Práticas Experimentais", tri1: "6,0", tri2: "6,0", tri3: null, faltas: [0, 0, 0] }
];
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