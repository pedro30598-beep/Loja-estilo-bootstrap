const detalheProduto = document.getElementById("detalhe-produto");

function pegarSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get("produto");
}

async function buscarProdutos() {
    try {
        const resposta = await fetch("../assets/data/produtos.json");
        const produtos = await resposta.json();
        const slug = pegarSlug();
        const produto = produtos.find(p => p.slug === slug);
        if (!produto) {
            detalheProduto.innerHTML = "<p>Produto não encontrado</p>";
            return;
        }
        mostrarDetalhes(produto);
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        detalheProduto.innerHTML = "<p>Erro ao carregar produto</p>";
    }
}

function mostrarDetalhes(produto) {
    detalheProduto.innerHTML = `
        <div class="card text-center bg-dark text-light mb-4" style="width: 45rem;">
            <img src="../${produto.imagem}" alt="Imagem do charuto ${produto.nome}" class="card-img-top img-fluid">
            <div class="card-body">
                <h1 class="card-title"><u>${produto.nome}</u></h1>
                <p class="card-text">${produto.descricao}</p>
                <h3>R$ ${produto.preco.toFixed(2)}</h3>
                <button class="btn btn-success btn-lg btn-css">Comprar</button>
                <a class="btn btn-secondary btn-css mt-2" href="../index.html">Voltar</a>
            </div>
        </div>
    `;
    document.title = `${produto.nome} | Loja da Fran`;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
        metaDescription.setAttribute("content", produto.descricao);
    }
}
document.addEventListener("DOMContentLoaded", buscarProdutos);