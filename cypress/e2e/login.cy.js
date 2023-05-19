/// <reference types="Cypress" />
import { loginPage } from '../support/pageObjects/LoginPage'

describe('Login Test Suite', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
        cy.wait(2000)
    })
    it('Scenario 1: Verify Successful Login', () => {

        cy.fixture('data').then( data => { 

        loginPage.fillUsername(data.email)
        loginPage.fillPassword(data.password)
        loginPage.submit()
        loginPage.checkStatusMessage('You logged into a secure area!')
        })
    })

    it('Scenario 2: Verify Login Attempt with Invalid Credentials', () => {
        loginPage.fillUsername('invalidUser')
        loginPage.fillPassword('invalidPassword')
        loginPage.submit()
        loginPage.checkStatusMessage('Your username is invalid!')
    })

    it('Scenario 3: Verify Login Attempt with Empty Fields', () => {
        loginPage.submit()
        loginPage.checkStatusMessage('Your username is invalid!')
    })

    // Assuming the maximum limit is 20 characters for both username and password
    it('Scenario 4: Verify Input Field Constraints', () => {
        loginPage.fillUsername('a'.repeat(21))
        loginPage.fillPassword('a'.repeat(21))
        loginPage.submit()
        loginPage.checkStatusMessage('Your username is invalid!')
    })

    // After successful login, we will logout.
    it('Scenario 5: Verify Logout', () => {
        cy.fixture('data').then( data => { 

        loginPage.fillUsername(data.email)
        loginPage.fillPassword(data.password)
        loginPage.submit()
        loginPage.checkStatusMessage('You logged into a secure area!')
        cy.wait(3000)

        cy.logout()
        loginPage.checkStatusMessage('You logged out of the secure area!')
        })
    })

    it('Scenario 6: Verify Username Field Requirement', () => {

        cy.fixture('data').then( data => { 

        loginPage.fillPassword(data.password)
        loginPage.submit()
        loginPage.checkStatusMessage('Your username is invalid!')
        })
    })

    it('Scenario 7: Verify Password Field Requirement', () => {

        cy.fixture('data').then( data => { 

        loginPage.fillUsername(data.email)
        loginPage.submit()
        loginPage.checkStatusMessage('Your password is invalid!')
        })
    })
})
