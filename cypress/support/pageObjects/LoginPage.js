class LoginPage {

    fillUsername(value) {
        cy.get('input[name=username]')
            .clear()
            .type(value, { delay: 33 })
    }

    fillPassword(value) {
        cy.get('input[name=password]')
            .clear()
            .type(value, { delay: 33 })
    }

    submit() {
        cy.get('button[type=submit]').click()
    }

    checkStatusMessage(text){
        cy.get('#flash').contains(text).should('be.visible')
    }
}

export const loginPage = new LoginPage();
