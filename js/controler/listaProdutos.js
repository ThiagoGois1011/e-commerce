import { serverProdutos } from "../server/serverProdutos.js"

let contadorGeral = 0
let listaCompletaConsoles = []
let listaCompletaDiversos = []
let listaCompletaStarWars = []

alert("siga as instruções do readme, é necessario usar json-server para que funcione corretamente!!!")

const carregaBox = (section, name, price,imageURL, id, tamanho, alt) => {
    const starWars = document.querySelector(".starwars__content")
    const consoles = document.querySelector(".consoles__content")
    const diversos = document.querySelector(".diversos__content")

    const conteudo = `
    <ul class="${section}__ul">
        <li><img  src="${imageURL}" alt="${alt}"></li>
        <li>${name}</li>
        <li>R$ ${price}</li>
        <li><a href="./ver_produto.html?id=${id}">Ver produto</a></li>
    </ul>`

    const box = document.createElement("div")
    const classBox = `${section}__box`
    box.setAttribute("class", classBox)
    box.innerHTML = conteudo
    const categoria = section
    box.dataset.id = id
    contadorGeral++

    if(categoria == "starwars"){listaCompletaStarWars.push(box)}
    if(categoria == "consoles" ){listaCompletaConsoles.push(box)}
    if(categoria != "starwars" && categoria != "consoles"){listaCompletaDiversos.push(box)}

    if(contadorGeral == tamanho){

        const valor = sorteiaBox(listaCompletaStarWars.length)
        const valor1 = sorteiaBox(listaCompletaConsoles.length)
        const valor2 = sorteiaBox(listaCompletaDiversos.length)
        
        for(let i= 0; i < valor.length; i++){
            let boxEscolhida = listaCompletaStarWars[valor[i]]
            starWars.appendChild(boxEscolhida)       
        }
        for(let i= 0; i < valor1.length; i++){
            let boxEscolhida = listaCompletaConsoles[valor1[i]]
            consoles.appendChild(boxEscolhida)       
        }
        for(let i= 0; i < valor2.length; i++){
            let boxEscolhida = listaCompletaDiversos[valor2[i]]
            diversos.appendChild(boxEscolhida)       
        }
        
    }
   

}

const sorteiaBox = (list) => {
    let numerosSorteados = []
    while(numerosSorteados.length < 6){
        const numero = Math.floor(Math.random() * list)
        if(numerosSorteados.indexOf(numero) == -1){
            numerosSorteados.push(numero)
        }
      
        
        
    }
    return numerosSorteados
}

const render = async () => {

    try{
        const lista = await serverProdutos.Produtos()
        lista.forEach(elemento =>{
            carregaBox(elemento.section, elemento.name, elemento.price, elemento.imageURL, elemento.id, lista.length, elemento.alt)
        })
    }
    catch(erro){
        console.log(erro)
    }
    
}
render()





