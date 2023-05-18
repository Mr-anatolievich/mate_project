
# Setting up Cypress.io

A brief description of what this project does and who it's for

Welcome! This README guide will help you get up and running with Cypress.io, a powerful end-to-end testing framework for web applications.


## Steps to Setup

#### 1. Clone the Repository

First, you need to clone this repository to your local machine. Run the following command:

```bash
git clone https://github.com/Mr-anatolievich/mate_project.git

```

#### 2. Install Cypress
```bash
npm install cypress --save-dev

```
#### 3. Run Cypress
```bash
npx cypress open

```

    
# Test Scenarios

This document contains a set of test scenarios to verify the functionality of the login feature in the application. These scenarios cover various cases, including successful login, login attempts with invalid credentials, empty fields, input field constraints, and logout.

## Scenario 1: Verify Successful Login

* Description: The user should be able to log in successfully using valid credentials.
* Test Steps:
   * Open the application login page.
   * Enter the username as "tomsmith" and the password as "SuperSecretPassword!".
   * Click the login button.
* Expected Result:
   * The user is redirected to the expected page (e.g., homepage or dashboard).

## Scenario 2: Verify Login Attempt with Invalid Credentials

* Description: The application should prevent access and display an appropriate error message when the user tries to log in with invalid credentials.
* Test Steps:
   * Open the application login page.
   * Enter an invalid username and/or an invalid password.
   * Click the login button.
* Expected Result:
   * The application displays an error message indicating that the login attempt was unsuccessful.

## Scenario 3: Verify Login Attempt with Empty Fields

* Description: The application should prevent access and display an appropriate error message when the user tries to log in with empty username and/or password fields.
* Test Steps:
   * Open the application login page.
   * Leave the username field, the password field, or both fields empty.
   * Click the login button.
* Expected Result:
   * The application displays an error message indicating that the login attempt was unsuccessful.

## Scenario 4: Verify Input Field Constraints

* Description: The application should enforce input field constraints by not allowing more characters than the maximum limit for the username and password fields. It should display an appropriate error message when these constraints are violated.
* Test Steps:
   * Open the application login page.
   * Enter a username that exceeds the maximum character limit.
   * Enter a password that exceeds the maximum character limit.
   * Click the login button.
* Expected Result:
   * The application displays an error message indicating that the input exceeds the allowed character limit for the respective field(s).

## Scenario 5: Verify Logout

* Description: The user should be able to log out successfully from the application.
* Test Steps:
   * Log in to the application using valid credentials.
   * Locate and click the logout button or link.
* Expected Result:
   * The application logs out the user successfully and displays a message indicating a successful logout.

## Scenario 6: Verify Username Field Requirement

* Description: The application should mandate the input of a username to attempt login.
* Test Steps:
   * Open the application login page.
   * Enter a valid password, but leave the username field empty.
   * Click the login button.
* Expected Result:
   * The application prevents login and displays an error message indicating that a username is required.

## Scenario 7: Verify Password Field Requirement

* Description: The application should mandate the input of a password to attempt login.
* Test Steps:
   * Open the application login page.
   * Enter a valid username, but leave the password field empty.
   * Click the login button.
* Expected Result:
   * The application prevents login and displays an error message indicating that a password is required.



# Custom Command: logout
In this repository, we have implemented a custom Cypress command to handle the user logout operation. Here's the implementation:

```javascript
Cypress.Commands.add('logout', () => {
    cy.get('.icon-2x.icon-signout').click()
})
```
This command makes use of Cypress's built-in cy.get() function to find a DOM element with the classes icon-2x and icon-signout, which typically represent a logout button/icon on a webpage. Once this element is located, the click() function is called to simulate a user clicking on the button, thereby triggering a logout action.


For more information about custom commands in Cypress, you can refer to the official 
[Cypress Custom Commands Documentation](https://docs.cypress.io/api/cypress-api/custom-commands)


# Environment Variables

In Cypress, the **Cypress.env()** function is used to access environment variables defined within the Cypress configuration. The Cypress.env() function allows you to access and retrieve the values of these environment variables throughout your tests.

`BASE_URL=http://the-internet.herokuapp.com/login`

In particular, **Cypress.env('baseUrl')** is a commonly used global variable that represents the base URL of your application.




# LoginPage Class - Cypress.io Page Object Pattern Example

This example demonstrates the use of the Page Object Pattern with Cypress.io for testing. This approach encapsulates information about the elements on your application page and the interactions with them.

```javascript
class LoginPage {

    // Enter a username in the username field
    fillUsername(value) {
        cy.get('input[name=username]')
            .clear()
            .type(value)
    }

    // Enter a password in the password field
    fillPassword(value) {
        cy.get('input[name=password]')
            .clear()
            .type(value)
    }

    // Submit the login form
    submit() {
        cy.get('button[type=submit]').click()
    }

    // Check the status message
    checkStatusMessage(text){
        cy.get('#flash').contains(text).should('be.visible')
    }
}

export const loginPage = new LoginPage();

```
## Page Object Pattern in Cypress.io

The **Page Object Pattern** is a design pattern that allows for better organization and simplification of test code. It does this by creating an abstraction of the tested page (or component) and providing an API for interacting with it.

In our case, the **LoginPage** class is a Page Object. It represents a login page in our application and provides an API for interacting with the page, such as filling in the username and password, submitting the form, and verifying success.

Each method in this class represents a single interaction with the LoginPage. These methods can be used in multiple tests, making the tests easier to read and maintain.

Note: Remember to only include methods that perform interactions with the page or retrieve its state. Don't include assertions directly in the Page Object's methods to maintain its reusability and to separate concerns.

## Usage

To use the LoginPage class, import it at the beginning of your test file. Here's an example test:

```javascript
import { loginPage } from '../support/pageObjects/LoginPage'

describe('Login Test Suite', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
        cy.wait(2000)
    })

    it('should login successfully', () => {
        loginPage.fillUsername('username') // Replace 'username' with actual username
        loginPage.fillPassword('password') // Replace 'password' with actual password
        loginPage.submit()
        loginPage.checkLoginSuccess()
        loginPage.checkStatusMessage('You logged into a secure area!')
    })
})
```
## Best Practices for Implementing Page Objects in Cypress

Following are some best practices to keep in mind when implementing page objects in Cypress:

1. **Don't Include Assertions in Page Objects**: Your page objects should not include assertions. They should only return elements or element states. This makes them more reusable and keeps your tests easier to read and maintain.

2. **Locators Should be Unique and Stable**: To ensure your tests are robust and less likely to break with changes in your application, make sure the locators you're using to find elements are both unique and stable.

3. **Page Objects Should Reflect the Application's Structure**: Each page object should represent a page or component in your application. This will make your tests more intuitive to write and understand.

4. **Keep Page Objects DRY (Don't Repeat Yourself)**: If multiple page objects need to interact with the same element or set of elements, consider creating a base page object that other page objects can extend.

5. **Encapsulate Page Details**: The page object should fully encapsulate the UI details of the page it represents. Test scripts should interact with the page object's API and know nothing about the underlying page.


## 🚀 Yaroslav Saienko
Your future QA Automation Engineer (JS)


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yaroslav-saienko/)

