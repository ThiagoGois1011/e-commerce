import { serverProdutos } from "../server/serverProdutos.js";

const form = document.querySelector(".adiciona__form")

form.addEventListener("submit", async(evento) =>{
    evento.preventDefault()
    try {
        const input = form.querySelectorAll("input")
        const descricao = form.querySelector("textarea").value
        let valoresInput = []
        input.forEach(n =>{
            valoresInput.push(n.value)
        })
        
        await serverProdutos.criaProduto(valoresInput[2],valoresInput[0], valoresInput[3], valoresInput[1], descricao)
        window.location.href = "../../galeria.html"
    } catch (erro) {
        console.log(erro)
        
    }
})

// C:\Users\Thiago\Pictures\arvore.png