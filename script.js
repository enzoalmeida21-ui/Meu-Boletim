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