///<reference types="cypress"/>

import contrato from '../contracts/produtos.contract'


describe('Testes de API REST função Usuarios', () => {

  let token
  beforeEach(() => {
    cy.token('fulano@qa4677673.com.br', 'teste').then(tkn => {
      token = tkn
    })
  });
  
  it('Deve validar contrato de produtos', () => {
    cy.request('produtos').then(response => {
        return contrato.validateAsync(response.body)
    })
});


  it('listar usuarios - GET', () => {
    cy.request({
      method: 'GET',
      url: 'Usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.property('quantidade')
    })
  });

  it('Cadastrar usuario - Post', () => {
    let email = `fulano@qa${Math.floor(Math.random() * 100000000)}.com.br`

    cy.request({
      method: 'POST',
      url: 'Usuarios',
      body: {

        nome: 'fulano',
        email: email,
        password: 'teste',
        administrador: 'true'

      },
      headers: { authorization: token }
    }).should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })

  });

  it('Deve cadastrar um usuário ja cadastrado', () => {

    cy.request({
      method: 'POST',
      url: 'Usuarios',
      headers: { authorization: token },
      body: {
        "nome": "Thiago Henrique",
        "email": "thiagoz@qa.com.br",
        "password": "teste",
        "administrador": "true"
      },
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Este email já está sendo usado')

    })
  });


  it('Deve editar um usuário previamente cadastrado', () => { 
    let email = `gregorio@qa${Math.floor(Math.random() * 10000000000000)}.com`
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            nome: 'Gregorio',
            email: email,
            password: 'teste789',
            administrador: 'true'
          },          
          headers: {authorization: token}
        }).then(response => {
              let id = response.body._id
                cy.request({
                method: 'PUT',
                url: `usuarios/${id}`,
                headers: {authorization: token},
                body:{
                  "nome": 'Gregorio',
                  "email":  email,
                  "password": "Produto modificado",
                  "administrador": "true"
                }
          }).then(response => {
              expect(response.status).to.equal(200)
              expect(response.body.message).to.equal('Registro alterado com sucesso')
        });
          });
   });
  

   it('Deve deletar um usuário previamente cadastrado', () => {
    let email = `gregorio@qa${Math.floor(Math.random() * 10000000000000)}.com`
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            nome: 'Gregorio',
            email: email,
            password: 'teste789',
            administrador: 'true'
          },          
          headers: {authorization: token}
      }).then(response => {
        let id = response.body._id
          cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
          headers: {authorization: token},
          body:{
            "nome": 'Gregorio',
            "email":  email,
            "password": 'teste789',
            "administrador": "true"
          }
    }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Registro excluído com sucesso')
  });
    });
  });
});     