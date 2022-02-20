const loanAmountEditButton = () => cy.get('#header-calculator-amount > .bb-slider__value > button');
const loanAmountInput = () => cy.get('#header-calculator-amount > .bb-slider__value').find('input');
const loanPeriodEditButton = () => cy.get('#header-calculator-period > .bb-slider__value > button');
const loanPeriodInput = () => cy.get('#header-calculator-period > .bb-slider__value').find('input');
const estimatedMonthlyCost = () => cy.get('.bb-calculator__result-value');

describe("Loan amount calculator scenarios ", () => {

    beforeEach(() => {
        cy.visit('https://ansokan.bigbank.se/');
        cy.intercept("POST", "https://ansokan.bigbank.se/api/v1/loan/calculate", { statusCode: 200 }).as('waitForCalculator')
    });

    it("Positive scenario: Verify ESTIMATED MONTHLY COST", () => {
        cy.get('.bb-navbar__right-side > button').click();

        loanAmountEditButton().click();
        loanAmountInput().type('100000');

        loanPeriodEditButton().click();
        loanPeriodInput().type('100');

        estimatedMonthlyCost().click();

        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.gt', 1500);


    });


    it("Positive scenario: Update Loan amount and verify ESTIMATED MONTHLY COST", () => {
        cy.get('.bb-navbar__right-side > button').click();
        loanAmountEditButton().click();
        loanAmountInput().type('100000');

        loanPeriodEditButton().click();
        loanPeriodInput().type('100');

        estimatedMonthlyCost().click();
        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.gt', 1500);

        loanAmountEditButton().click();
        loanAmountInput().type('50000');

        estimatedMonthlyCost().click();
        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.lt', 1000);

    });

    it("Positive scenario: Update Loan period and verify ESTIMATED MONTHLY COST", () => {
        cy.get('.bb-navbar__right-side > button').click();
        loanAmountEditButton().click();
        loanAmountInput().type('100000');

        loanPeriodEditButton().click();
        loanPeriodInput().type('100');

        estimatedMonthlyCost().click();
        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.gt', 1500);

        loanPeriodEditButton().click();
        loanPeriodInput().type('50');

        estimatedMonthlyCost().click();
        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.gt', 2000);

    });


    it("Negative scenario: Verify max limit for Loan Amount and Loan Period", () => {
        cy.get('.bb-navbar__right-side > button').click();

        loanAmountEditButton().click();
        loanAmountInput().type('400000');

        estimatedMonthlyCost().click();

        loanAmountInput().should('have.value', '250 000');

        cy.log("Maximum amount accepted is 250 000 SEK only")

        loanPeriodEditButton().click();
        loanPeriodInput().type('300');

        estimatedMonthlyCost().click();
        loanPeriodInput().should('have.value', '144')
        cy.log("Maximum Loan Period is 144 months only")

    });

    it("Negative scenario: Verify min limit for Loan Amount and Loan Period", () => {
        cy.get('.bb-navbar__right-side > button').click();

        loanAmountEditButton().click();
        loanAmountInput().type('4000');

        estimatedMonthlyCost().click();

        loanAmountInput().should('have.value', '10 000');

        cy.log("Min amount accepted is 10 000 SEK only")

        loanPeriodEditButton().click();
        loanPeriodInput().type('4');

        estimatedMonthlyCost().click();
        loanPeriodInput().should('have.value', '12')
        cy.log("Min Loan Period is 12 months only")

    });

    it("Positive scenario: Verify slider movement for Loan Amount", () => {
        cy.get('.bb-navbar__right-side > button').click();

        loanAmountEditButton().click();
        loanAmountInput().type('100000');

        loanPeriodEditButton().click();
        loanPeriodInput().type('100');

        estimatedMonthlyCost().click();
        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.gt', 1500);

        cy.get('#header-calculator-amount').find('.vue-slider-dot-handle').type('{rightarrow}');
        loanAmountInput().should('have.value', '100 050');
        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.gt', 1500);

    });


    it("Positive scenario: Verify slider movement for Loan Period", () => {
        cy.get('.bb-navbar__right-side > button').click();

        loanAmountEditButton().click();
        loanAmountInput().type('100000');

        loanPeriodEditButton().click();
        loanPeriodInput().type('100');

        estimatedMonthlyCost().click();
        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.gt', 1500);

        cy.get('#header-calculator-period').find('.vue-slider-dot-handle').type('{leftarrow}');
        loanPeriodInput().should('have.value', '99');
        cy.wait('@waitForCalculator')
        estimatedMonthlyCost().invoke('text').then(parseFloat).should('be.gt', 1500);

    });

});

