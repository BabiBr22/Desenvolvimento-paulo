describe('Name Display App', () => {
  it('Deve permitir digitar um nome e exibi-lo na tela', () => {
    // Acessa a aplicação
    cy.visit('http://localhost:5173'); // URL padrão do Vite

    // Encontra o input, digita um nome e envia o formulário
    cy.get('input').type('Bárbara');
    cy.get('button').click();

    // Verifica se o nome foi exibido na tela
    cy.contains('Nome exibido: Bárbara').should('be.visible');
  });
});
