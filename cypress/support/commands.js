Cypress.Commands.add('cadastrarUsuario', (nome, email, password, administrador) => {
    cy.request({
        method: 'POST',
        url: 'Usuario',
        headers: { email: password },
        body: {
            "nome": "Thiago Henrique",
            "email": "Thiago@qa.com.br",
            "password": "teste",
            "administrador": "true"
            }
        
    })
})