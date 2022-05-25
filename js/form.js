const celulas = document.querySelectorAll('.celula');
let fim = false;

const jogador_x = "X";
const jogador_o = "O";
const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

document.addEventListener('click', (event) => {
    if (event.target.matches('.celula')) {
        jogar(event.target.id, jogador_x)
        setTimeout(() => bot(), 500)
    }
    // event vai criar um evento ao clique //.target vai fazer realizar a delegação de eventos e //.matches verifica se o elemento pode ser selecionado pela sequência de caracteres específica
})

function bot() {
    const posicoesDisponiveis = [];

    for(index in celulas)
    {
        if (!isNaN(index))
        {
            if(!celulas[index].classList.contains("X") &&
               !celulas[index].classList.contains("O"))
            //    .classList vai verificar as celulas e .contains vai verificar se nessas celulas tem o elemento ("X") ou ("O"); 
            {
                posicoesDisponiveis.push(index);
                // O método push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array;
            }
        }
    } 
    const posicaoAleatoria = Math.floor(
        Math.random() * posicoesDisponiveis.length
    );  
    if (!fim) {
        jogar(posicoesDisponiveis[posicaoAleatoria], jogador_o)
    }
}


function jogar(id, turno) {
    const celula = document.getElementById(id);
    celula.textContent = turno;
    celula.classList.add(turno)   
    // .add vai adicionar um valor;
    checarVencedor(turno)
}
function checarVencedor(turno) {
    // => inicia um metodo de array
    const vencedor = combinacoes.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno);
        })
        // O método some() testa se ao menos um dos elementos no array passa no teste implementado pela função atribuída e retorna um valor true ou false
        // every() testa se todos os elementos do array passam pelo teste implementado pela função fornecida.
    })
    
    if (vencedor) {
        encerrarJogo(turno);
    }
    else if (checarEmpate()) {
        encerrarJogo();
    }
}
function checarEmpate() {
    let x = 0
    let o = 0

    for (index in celulas) { 
        if(!isNaN(index)){      
        if (celulas[index].classList.contains(jogador_x)) {
            x++
        }

        if (celulas[index].classList.contains(jogador_o)) {
            o++
        }
    }
    }
    return x + o === 9 ? true : false
}
function encerrarJogo(vencedor = null) {
    fim = true;
    const tela = document.getElementById('tela');
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");

    tela.style.display = "block";
    tela.appendChild(h2);
    tela.appendChild(h3);
    // O método appendChild() vai inserir um novo h2/h3 na estrutura da pagina


    if (vencedor) {
       h2.innerHTML = "Parabens !!! O vencedor é o: " + vencedor
    }
    else{
        h2.innerHTML = "Foi um empate"
    }

    let contador = 3
    setInterval(() => {
        h3.innerHTML = "Reiniciando o jogo em " + contador-- + "...";
    }, 1000);
    setTimeout(() => location.reload(), 4000);
    // O método Location.reload() recarrega a pagina
}
