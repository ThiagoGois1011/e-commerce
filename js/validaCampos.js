export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    
   if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input_invalido');
        input.parentElement.querySelector('.informa__contato_erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input_invalido');
        input.parentElement.querySelector('.informa__contato_erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }

}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const validadores = {
	nome:input => validaTamanho(input),
    nome_produto:input => validaTamanho(input),
    descricao:input => validaTamanho(input),
	email:input => validaEstrutura(input),
	assunto:input => validaTamanho(input),
	mensagem:input => validaTamanho(input)	
}


const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.',
        customError:  'O texto deve conter no máximo 40 carateres.'
    },
    nome_produto: {
        valueMissing: 'O campo de nome não pode estar vazio.',
        customError:  'O texto deve conter no máximo 20 carateres.'
    },
    url: {
        valueMissing: 'O campo de URL não pode estar vazio.'
    },
    categoria: {
        valueMissing: 'O campo de categoria não pode estar vazio.'
    },
    preco: {
        valueMissing: 'O campo de preço não pode estar vazio.',
        patternMismatch: 'O campo de preço deve ser preenchido de forma correta. ex: 1,00'

    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.',
        customError:  'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo da senha não pode estar vazio.' 
    },
    assunto: {
    	valueMissing: 'O campo de assunto não pode estar vazio.',
        customError:  'O texto deve conter no máximo 50 carateres.'
    },
    descricao: {
    	valueMissing: 'O campo de descrição não pode estar vazio.',
        customError:  'O texto deve conter no máximo 150 carateres.'
    },
    mensagem: {
    	valueMissing: 'O campo de mensagem não pode estar vazio.',
        customError:  'O texto deve conter no máximo 120 carateres.'
    }
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}

function validaTamanho(input){

	var tipoDeInput = input.dataset.tipo;
	var valor = input.value.length
	var mensagem = ""
	

	if(tipoDeInput == "mensagem" && valor > 120){
		mensagem = "O texto deve conter no máximo 120 carateres."
	}

	if (tipoDeInput == "nome"  && valor > 40){
		mensagem = "O texto deve conter no máximo 40 carateres."	
	}
    if(tipoDeInput == "nome_produto" && valor > 20){
		mensagem = "O texto deve conter no máximo 20 carateres."
	}
    if(tipoDeInput == "descricao" && valor > 150){
		mensagem = "O texto deve conter no máximo 150 carateres."
	}

	input.setCustomValidity(mensagem)
}

function validaEstrutura(input){

	var mensagem = ""

	if(input.value.indexOf(".") == -1){
		mensagem = "Deve estar em formato de e-mail contendo o caractere especial @ seguido por um domínio ou provedor seguido por um ponto (.) Exemplo: text@texto.com"
	}
	if(input.validity.valueMissing == false && input.validity.typeMismatch == false){
		input.setCustomValidity(mensagem)
	}

}

