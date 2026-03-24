const listaProdutos = document.getElementById("lista-produtos");
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
            <img src="${produto.imagem}" class="card-img-top img-fluid" alt="${produto.nome}">
            <br>
            <h3><u>${produto.nome}</u></h3>
            <br>
            <p>${(produto.descricao).substring(0,2000) + "..."}</p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button class="btn btn-primary btn-detalhes btn-css">Ver Detalhes</button>
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

document.addEventListener("DOMContentLoaded", () => {
    buscarProdutos();
});