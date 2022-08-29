import { serverProdutos } from "../server/serverProdutos.js"

const galeriaBox = (imageUrl, name, price, id, alt ) => {
    const galeriaContent = document.querySelector(".galeria__content")
    const criaGaleriaBox = document.createElement("div")
    criaGaleriaBox.setAttribute("class", "galeria__box")
    const conteudo = `<ul class="galeria__ul">
    <li>
        <img src="${imageUrl}" alt="${alt}">
        
        <svg class="lixo" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="lixo" d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" />
        </svg>
        <a href="../../atualizaProduto.html?id=${id}" ><svg class="lapis" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="lapis" d="M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM17.71 5.04C18.1 4.65 18.1 4.02 17.71 3.63L15.37 1.29C14.98 0.899998 14.35 0.899998 13.96 1.29L12.13 3.12L15.88 6.87L17.71 5.04Z"/>
        </svg></a>
        
    </li>
    <li>${name}</li>
    <li>R$ ${price}</li>
    <li><p>#1111111</p></li>
    </ul>`
    criaGaleriaBox.innerHTML = conteudo
    criaGaleriaBox.dataset.id = id
    galeriaContent.appendChild(criaGaleriaBox)
}

const tabela = document.querySelector(".galeria__content")

tabela.addEventListener('click', async (evento)=> {
    let ehBotaoDeDeleta = evento.target.id === "lixo"
    if(ehBotaoDeDeleta){
        try {
            const boxProduto = evento.target.closest('[data-id]')
            let id = boxProduto.dataset.id
            await serverProdutos.deletaProduto(id)
            boxProduto.remove()
        }
        catch(erro){
            console.log(erro)
           
        }
    }
})

const render = async() => {
    try {
        const lista = await serverProdutos.Produtos()
        lista.forEach(elemento =>{
            galeriaBox(elemento.imageURL, elemento.name, elemento.price, elemento.id, elemento.alt)
        }) 
    } catch (erro) {
        console.log(erro)
    }
    
}

render()