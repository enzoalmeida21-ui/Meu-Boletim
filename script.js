// Dados atualizados a partir da tabela fornecida
const dadosBoletim = [
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
/* ===================================================
   EFEITO CHUVA MATRIX (CANVAS ANIMATION)
   =================================================== */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas para o tamanho exato da janela
function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
redimensionarCanvas();
window.addEventListener('resize', redimensionarCanvas);

// Caracteres estilo Matrix (Katakana japonês + números)
const caracteres = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF';
const tamanhoFonte = 16;
let colunas = Math.floor(canvas.width / tamanhoFonte);

// Guarda a posição vertical (linha) de cada coluna
let gotas = [];
for (let i = 0; i < colunas; i++) {
    gotas[i] = Math.floor(Math.random() * -100);
}

function desenharMatrix() {
    // Fundo semitransparente para criar o efeito de rastro
    ctx.fillStyle = 'rgba(13, 13, 13, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66'; // Cor verde Matrix
    ctx.font = tamanhoFonte + 'px monospace';

    colunas = Math.floor(canvas.width / tamanhoFonte);

    for (let i = 0; i < gotas.length; i++) {
        // Escolhe um caractere aleatório da lista
        const texto = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        const x = i * tamanhoFonte;
        const y = gotas[i] * tamanhoFonte;

        ctx.fillText(texto, x, y);

        // Se a gota passou do fim da tela, reinicia aleatoriamente
        if (y > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }

        gotas[i]++;
    }
}

// Executa a animação repetidamente a cada 40 milissegundos
setInterval(desenharMatrix, 40);