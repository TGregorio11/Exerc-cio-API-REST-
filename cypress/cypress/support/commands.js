Cypress.Commands.add ('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha
        }
     })
})

Cypress.Commands.add('cadastrarUsuarios', (token,nome, email, password, administrador) => {
    cy.request({
        method: 'POST',
        url: 'Usuarios',
        headers: {authorization: token},
        boady: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
            },
        failOnStatusCode: false
    })
})

