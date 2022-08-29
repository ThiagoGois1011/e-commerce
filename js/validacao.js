import { valida } from './validaCampos.js'
const main = document.querySelector("main")
const inputs = main.querySelectorAll('input');
const textarea = document.querySelectorAll('textarea');


inputs.forEach(input => {
	input.addEventListener('blur', (evento) => {
        valida(evento.target);
        
    })
})

textarea.forEach(input => {
	input.addEventListener('blur', (evento) => {
        valida(evento.target);
        
    })
})
