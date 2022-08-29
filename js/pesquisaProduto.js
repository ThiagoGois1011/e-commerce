import { serverProdutos } from "./server/serverProdutos.js";

var campoFiltro = document.querySelector(".menu__pesquisa");
let main = document.querySelector("main")
const body = document.querySelector("body")
const list = await serverProdutos.Produtos()
let resultado = false
let contador = 0
const lupa = document.querySelector(".menu__lupa")
const input = document.querySelector(".menu__pesquisa_phone")

lupa.addEventListener("click", n =>{
    input.classList.add("pesquisaativa")
    setTimeout(n =>{
        input.focus() 
    }, 500)  
})

const produtosFiltrados = () =>{
    const section = document.createElement("section")
    const conteudo = `<div class="filtrados__head">
            <h1>Resultado da Pesquisa</h1>
            </div>
        <div class="filtrados__content">
        </div>`
    section.classList.add("filtrados")
    section.innerHTML = conteudo
    body.insertBefore(section, main)
    resultado = true
}

const filtradosBox = (imageUrl, name, price, id, alt ) => {
    const filtradosContent = document.querySelector(".filtrados__content")
    const criaBox = document.createElement("div")
    criaBox.setAttribute("class", "filtrados__box")
    const conteudo = `<ul class="filtrados__ul">
    <li><img  src="${imageUrl}" alt="${alt}"></li>
    <li>${name}</li>
    <li>R$ ${price}</li>
    <li><a href="./ver_produto.html?id=${id}">Ver produto</a></li>
</ul>`
    criaBox.innerHTML = conteudo
    criaBox.dataset.id = id
    filtradosContent.appendChild(criaBox)
} 

function pesquisa() {
    if (this.value.length > 0) {
        main.setAttribute("id","invisivel")
        if(contador <= 0){
            produtosFiltrados()
            contador++
        }
        var expressao = new RegExp(this.value, "i");

        const render = async() =>{
            list.forEach( n =>{
                if (expressao.test(n.name)) {
                    filtradosBox(n.imageURL, n.name, n.price, n.id, n.alt)
                }
            })
        
        }
        render()
        
    } else {
        main.removeAttribute("id")
        if(resultado){
            let secFiltrados = document.querySelector(".filtrados")
            secFiltrados.remove()
            contador = 0
            resultado = false
        }
        

    }
}


campoFiltro.addEventListener("input", pesquisa);
input.addEventListener("input", pesquisa);
input.addEventListener("blur",()=>{
    input.classList.remove("pesquisaativa")
});

