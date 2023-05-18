class LoginPage {

    fillUsername(value) {
        cy.get('input[name=username]')
            .clear()
            .type(value)
    }

    fillPassword(value) {
        cy.get('input[name=password]')
            .clear()
            .type(value)
    }

    submit() {
        cy.get('button[type=submit]').click()
    }

    checkStatusMessage(text){
        cy.get('#flash').contains(text).should('be.visible')
    }
}

export const loginPage = new LoginPage();
