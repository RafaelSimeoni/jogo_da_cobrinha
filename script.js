let campo = document.querySelector("#campo")
let contexto = campo.getContext("2d")
let caixa = 32
let cobrinha = []
cobrinha[0] = {
    x: 8 * caixa,
    y: 8 * caixa
}
let direcao = "direita"
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
}

function criarCampo() {
    contexto.fillStyle = "#292b2c"
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa) //desenha o retângulo do jogo
}

function criarCobrinha() {
    for (let i = 0; i < cobrinha.length; i++) {
        contexto.fillStyle = "#5cb85c"
        contexto.fillRect(cobrinha[i].x, cobrinha[i].y, caixa, caixa)
    }
}

function criarComida() {
    contexto.fillStyle = '#d9534f'
    contexto.fillRect(comida.x, comida.y, caixa, caixa)
}

document.addEventListener('keydown', atualizarMovimentacao)

function atualizarMovimentacao(tecla) {
    if(tecla.keyCode == 37 && direcao != 'direita') direcao = 'esquerda'
    if(tecla.keyCode == 38 && direcao != 'baixo') direcao = 'cima'
    if(tecla.keyCode == 39 && direcao != 'esquerda') direcao = 'direita'
    if(tecla.keyCode == 40 && direcao != 'cima') direcao = 'baixo'
}

function iniciarJogo() {
    if(cobrinha[0].x > 15 * caixa && direcao == "direita") cobrinha[0].x = 0
    if(cobrinha[0].x < 0 && direcao == "esquerda") cobrinha[0].x = 16 * caixa
    if(cobrinha[0].y > 15 * caixa && direcao == "baixo") cobrinha[0].y = 0
    if(cobrinha[0].y < 0 && direcao == "cima") cobrinha[0].y = 16 * caixa

    for(let i = 1; i < cobrinha.length; i++) {
        if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y) {
            clearInterval(jogo)
            alert('Fim de Jogo')
            location.reload()
        }
    }

    criarCampo()
    criarCobrinha()
    criarComida()

    let cobrinhaX = cobrinha[0].x
    let cobrinhaY = cobrinha[0].y

    if(direcao == "direita") cobrinhaX += caixa
    if(direcao == "esquerda") cobrinhaX -= caixa
    if(direcao == "cima") cobrinhaY -= caixa
    if(direcao == "baixo") cobrinhaY += caixa

    if(cobrinhaX != comida.x || cobrinhaY != comida.y) {
        cobrinha.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * caixa
        comida.y = Math.floor(Math.random() * 15 + 1) * caixa  
    }


    let novoPedaco = {
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobrinha.unshift(novoPedaco);
}

    let jogo = setInterval(iniciarJogo, 100)

