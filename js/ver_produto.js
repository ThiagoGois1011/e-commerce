import { serverProdutos } from "./server/serverProdutos.js";

const pegaURL = new URL(window.location)
const id = pegaURL.searchParams.get('id')
const tudo = []
const tudoMesmo = []
let contadorGeral = 0


const divCarrega = (imagem,name,price,description, alt) => {
    const divDetalhes = document.querySelector(".produto__detalhe")
    const conteudo = `<img class="produto__imagem" src="${imagem}" alt="${alt}">
<div class="produto__descricao">
    <p class="produto__descricao--titulo">${name}</p>
    <p class="produto__descricao--preco">R$ ${price}</p>
    <p class="produto__descricao--descricao">${description}</div>`
    divDetalhes.innerHTML = conteudo
   
}

const sorteiaBox = (list, max) => {
    let numerosSorteados = []
    while(numerosSorteados.length < max){
        const numero = Math.floor(Math.random() * list)
        if(numerosSorteados.indexOf(numero) == -1){
            numerosSorteados.push(numero)
        }
        
    }
    return numerosSorteados
}

const boxs = (imageUrl, name, price, id, alt, tamanho, section , sectionAtual ) => {
    const boxContent = document.querySelector(".produto__similares--lista")
    const criaBox = document.createElement("div")
    criaBox.setAttribute("class", "produto__box")
    const conteudo = `<ul class="produto__ul">
    <li><img  src="${imageUrl}" alt="${alt}"></li>
    <li>${name}</li>
    <li>R$ ${price}</li>
    <li><a href="./ver_produto.html?id=${id}">Ver produto</a></li>
</ul>`
    criaBox.innerHTML = conteudo
    criaBox.dataset.id = id
    contadorGeral++
    if(section == sectionAtual){
        tudo.push(criaBox)
    }
    if(section != sectionAtual){
        tudoMesmo.push(criaBox)
    }

    if(tamanho == contadorGeral){
        const valorReal = tudo.length - 1
        const valor = sorteiaBox(valorReal, 5)
        const boxEscolhidaFora = tudoMesmo[sorteiaBox(tudoMesmo.length, 1)]
        boxContent.appendChild(boxEscolhidaFora)
        for(let i= 0; i < valor.length; i++){
            let boxEscolhida = tudo[valor[i]]
            boxContent.appendChild(boxEscolhida)
        }
    }
    
}

const carrega = async () => {
    try { 
        const dados = await serverProdutos.detalhaProduto(id)
        divCarrega(dados.imageURL, dados.name, dados.price, dados.description, dados.alt)

        const dados2 = await serverProdutos.Produtos()
        dados2.forEach(element => {
            boxs(element.imageURL, element.name, element.price, element.id, element.alt, dados2.length, element.section, dados.section)
        });
        
    } catch (erro) {
        console.log(erro)
        
    }
}
carrega()
