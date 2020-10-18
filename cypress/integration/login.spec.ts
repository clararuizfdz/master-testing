describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should have the focus in name input when it clicks on it', () => {
    //Arrange

    //Act
    cy.visit('/');
    cy.get('[data-cy=userLogin] > .MuiInputBase-root > .MuiInputBase-input').as(
      'userInput'
    );
    cy.get('@userInput').click();

    //Assert
    cy.get('@userInput').should('have.focus');
  });

  it('should navigate to menu when type valid credentials ', () => {
    //Arrange
    const user = 'admin';
    const password = 'test';

    //Act
    cy.visit('/');
    cy.get('[data-cy=userLogin]').as('userInput');
    cy.get('[data-cy=passwordLogin]').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    //Assert
    cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
  });

  it('should show message error when click login button without user and password ', () => {
    //Arrange

    //Act
    cy.visit('/');

    cy.findByRole('button', { name: 'Login' }).click();

    //Assert
    cy.get('[data-cy=userLogin] > .MuiFormHelperText-root').should(
      'be.visible'
    );
    cy.get('[data-cy=passwordLogin] > .MuiFormHelperText-root').should(
      'be.visible'
    );
  });

  it('should show an alert with a message when type invalid credentials ', () => {
    //Arrange
    const user = 'user';
    const password = 'password';

    //Act
    cy.visit('/');
    cy.get('input[name="user"]').as('userInput');
    cy.get('input[name="password"]').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    //Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.get('.MuiSnackbarContent-message').should('be.visible');
    cy.get('.MuiSnackbarContent-message').should(
      'contain.text',
      'Usuario y/o password no válidos'
    );
  });
});
