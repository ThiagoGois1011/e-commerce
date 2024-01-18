import { serverProdutos } from "../server/serverProdutos.js";
const form = document.querySelector(".adiciona__form")
const pegaURL = new URL(window.location)
const id = pegaURL.searchParams.get('id')

const carrega = async () => { 
    const input = form.querySelectorAll("input")
    const descricao = form.querySelector("textarea")
    try {
        
        const dados = await serverProdutos.detalhaProduto(id)
        input[0].value = dados.imageURL
        input[1].value = dados.section
        input[2].value = dados.name
        input[3].value = dados.price
        descricao.value = dados.description
        
    } catch (erro) {
        console.log(erro)
        
    }
}

//carrega()
  
    
   
    
    
 form.addEventListener('submit', async (evento)=> { 
  evento.preventDefault()
  try {
    const input = form.querySelectorAll("input")
    const descricao = form.querySelector("textarea")

    let valoresInput = []
    input.forEach(n =>{
        valoresInput.push(n.value)
    })
    await serverProdutos.atualizaProduto(valoresInput[2],valoresInput[0], valoresInput[3], valoresInput[1], descricao, id)
    window.location.href = "../../galeria.html"
  }
  catch(erro){
    console.log(erro)
  }
}) 
  



//C:\Users\Thiago\Pictures\arvore.png