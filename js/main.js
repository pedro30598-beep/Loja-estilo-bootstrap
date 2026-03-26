const listaProdutos = document.getElementById("lista-produtos");
const tema = document.getElementById("trocaTema");
const aumenta = document.getElementById("aumenta");
const diminui = document.getElementById("diminui");
const lerPG = document.getElementById("lerPG");
let produtos = [];

async function buscarProdutos() {
    const resposta = await fetch("assets/data/produtos.json");
    produtos = await resposta.json();
    mostrarProdutos(produtos);
}

function mostrarProdutos(lista) {
    listaProdutos.innerHTML = "";
    lista.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("card", "p-3", "text-center", "bg-dark", "text-light", "mb-4", "card-css");
        card.style.width = "30rem";

        card.innerHTML = `
            <img src="${produto.imagem}" class="card-img-top img-fluid" alt="Imagem do charuto${produto.nome}">
            <br>
            <h3><u>${produto.nome}</u></h3>
            <br>
            <p>${(produto.descricao).substring(0, 2000) + "..."}</p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button class=" mb-2 btn btn-primary btn-detalhes btn-css">Ver Detalhes</button>
            <br>
            <button class=" btn btn-success btn-css">Comprar</button>
        `;

        const botaoDetalhes = card.querySelector(".btn-detalhes");
        botaoDetalhes.addEventListener("click", () => {
            window.location.href = `pages/detalhe.html?produto=${produto.slug}`;
        });

        listaProdutos.appendChild(card);
    });
}
function trocaTema() {
    const body = document.body;
    const temaAtual = body.getAttribute("data-bs-theme");
    if (temaAtual === "dark") {
        body.setAttribute("data-bs-theme", "light");
    } else {
        body.setAttribute("data-bs-theme", "dark");
    }
}
function aumentarTexto() {
    document.body.style.fontSize = "20px";
}
function diminuiTexto() {
    document.body.style.fontSize = "14px";
}
let lend = false;
function LerPagina() {
    if (lendo) {
        speechSynthesis.cancel();
        lendo = false;
    } else {
        const texto = document.body.innerText;
        const fala = new SpeechSynthesisUtterance(texto);
        fala.onend = () => {
            lendo = false;
        };
        speechSynthesis.speak(fala);
        lendo = true;
    }
}
aumenta.addEventListener("click", aumentarTexto);
diminui.addEventListener("click", diminuiTexto);
tema.addEventListener("click", trocaTema);
document.addEventListener("DOMContentLoaded", () => {
    buscarProdutos();
});