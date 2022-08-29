const botao = document.querySelector(".login__button")
const form = document.querySelector(".login_form")

form.addEventListener('click', evento => {
    evento.preventDefault()
})

botao.addEventListener('click', (evento) => {
    const inputs = botao.parentNode.querySelectorAll('input')
    let contador = 0
    inputs.forEach( input => {
    
        if(input.validity.valid){
            contador++             
        }
    } )
    console.log(contador)

    if(contador == 3){
        window.location.href = '../galeria.html'
    }

})