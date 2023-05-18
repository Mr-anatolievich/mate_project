
import { loginPage } from '../support/pageObjects/LoginPage'

describe('Login Test Suite', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
        cy.wait(2000)
    })

    it('Verify Successful Login', () => {
        loginPage.fillUsername('tomsmith')
        loginPage.fillPassword('SuperSecretPassword!')
        loginPage.submit()
        loginPage.checkLoginSuccess()
        loginPage.checkStatusMessage('You logged into a secure area!')
    })

    it('Verify Login Attempt with Invalid Credentials', () => {
        loginPage.fillUsername('invalidUser')
        loginPage.fillPassword('invalidPassword')
        loginPage.submit()
        loginPage.checkStatusMessage('Your username is invalid!')
    })

    it('Verify Login Attempt with Empty Fields', () => {
        loginPage.submit()
        loginPage.checkStatusMessage('Your username is invalid!')
    })

    // Assuming the maximum limit is 20 characters for both username and password
    it('Verify Input Field Constraints', () => {
        loginPage.fillUsername('a'.repeat(21))
        loginPage.fillPassword('a'.repeat(21))
        loginPage.submit()
        loginPage.checkStatusMessage('Your username is invalid!')
    })

    // After successful login, we will logout.
    it.only('Verify Logout', () => {
        loginPage.fillUsername('tomsmith')
        loginPage.fillPassword('SuperSecretPassword!')
        loginPage.submit()
        loginPage.checkLoginSuccess()
        loginPage.checkStatusMessage('You logged into a secure area!')
        cy.wait(3000)

        cy.logout()
        loginPage.checkStatusMessage('You logged out of the secure area!')
    })
})
