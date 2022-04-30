describe('Login e registro de usuarios alura pic', () => {

    beforeEach(() => {
         cy.visit('https://alura-fotos.herokuapp.com')
    })

    it('verifica mensagem de validação', () => {
         cy.contains('a', 'Register now').click();
         cy.contains('button', 'Register').click();
         cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
         cy.contains('button', 'Register').click();
         cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
         cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
         cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })

    it('verifica mensagem de email invalido', () => {
         cy.contains('a', 'Register now').click();
         cy.contains('button', 'Register').click();
         cy.get('input[formcontrolname="email"]').type('Tacio');
         cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it('verifica mensagem de username', () => {
         cy.contains('a', 'Register now').click();
         cy.contains('button', 'Register').click();
         cy.get('input[formcontrolname="userName"]').type('Tacio');
         cy.contains('button', 'Register').click();
         cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
    })

     it('verifica mensagem de senha com menos de 8 caracteres', () => {
         cy.contains('a', 'Register now').click();
         cy.contains('button', 'Register').click();
         cy.get('input[formcontrolname="password"]').type('132');
         cy.contains('button', 'Register').click();
         cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
    })

    it('verifica mensagem Nome completo com mais de 2 letras', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="fullName"]').type('a');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
   })

   it('fazer login usuario valido', () => {
       cy.login('flavio', '123')
       cy.contains('a', '(Logout)').click();
   })

   it('fazer login usuario invalido', () => {
    cy.login('tacio', '1234');
    cy.on ('window:alert', (str) => {
        expect(str).to.equal('Invalid user name or password');
    })
   })

   const usuarios = require('../../fixtures/usuario.json');
   usuarios.forEach(usuario => {

    it(`registrar novo usuario ${usuario.userName} `, () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="email"]').type(usuario.email);
        cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
        cy.get('input[formcontrolname="userName"]').type(usuario.userName);
        cy.get('input[formcontrolname="password"]').type(usuario.password);
        cy.contains('button', 'Register').click();
    })

   });
})
