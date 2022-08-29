const Produtos = () => {
    return fetch(`http://localhost:3000/produtos`).then(resposta => {
        if(resposta.ok){
            return resposta.json()
            
        }
        throw new Error('Não foi possível listar os clientes')
        
    })
}

const criaProduto = (name, image, price, section, description) => {
    return fetch(`http://localhost:3000/produtos`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name: name,
            imageURL: image,
            price: price,
            id: 0,
            alt:"produto",
            section: section,
            description: description
        })
    })
    .then( resposta => {
        if(resposta.ok){
            return resposta.body
        }
        throw new Error('Não foi possível criar um cliente')
    })
}

const deletaProduto = (id) => {
    return fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE'
    })
    .then( resposta => { 
        if(!resposta.ok){
        throw new Error('Não foi possível deletar um cliente')
        }
    })
}

const atualizaProduto = (name, image, price, section, description, id) => {
    return fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            name: name,
            imageURL: image,
            price: price,
            alt:"produto",
            section: section,
            description: description
        })
    })
    .then( resposta => {
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível detalhar um cliente')
    })
}

const detalhaProduto = (id) => { 
    return fetch(`http://localhost:3000/produtos/${id}`)
    .then(resposta => { 
        if(resposta.ok){
            return resposta.json()
        }
    
        throw new Error('Não foi possível detalhar um cliente')
    })
}

export const serverProdutos = {
    Produtos,
    criaProduto,
    deletaProduto,
    atualizaProduto,
    detalhaProduto
}