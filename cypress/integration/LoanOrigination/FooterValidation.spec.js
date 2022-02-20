describe("Footer link validations ", () => {

    context("First Name field validation", () => {

        before(() => {
            cy.visit('https://ansokan.bigbank.se/');
        });

        it("Verifying 'Price list' link", () => {
            cy.get('.bb-footer__links').contains("Prislista")
                .should('have.attr', 'href', 'https://www.bigbank.se/villkor-och-policy?main=6&sec&doc=3509')
        });

        it("Verifying 'Frequently asked questions about Private Loans' link", () => {
            cy.get('.bb-footer__links').contains("Vanliga frågor om Privatlån")
                .should('have.attr', 'href', 'https://www.bigbank.se/kundservice?sec=68&main=4')
        });

        it("Verifying 'General terms and conditions for consumer credit agreements' link", () => {
            cy.get('.bb-footer__links').contains("Allmänna villkor för konsumentkreditavtal")
                .should('have.attr', 'href', 'https://static.bigbank.se/assets/2021/02/04093228/Allmanna-villkor-for-konsumentkreditavtal-KL-Version-1_7_27_6_2018.pdf')
        });

        it("Verifying 'Principles for processing customer data'", () => {
            cy.get('.bb-footer__links').contains("Principer för behandling av kunddata")
                .should('have.attr', 'href', 'https://static.bigbank.se/assets/2021/02/19121448/Principles_of_personal_data_processing.pdf')
        });

        it("Verifying 'The Bank's General Terms and Conditions' link", () => {
            cy.get('.bb-footer__links').contains("Bankens Allmänna Villkor")
                .should('have.attr', 'href', 'https://static.bigbank.se/assets/2021/02/19121445/Allmnna-villkor-for_Bigbank-1.pdf')
        });

        it("Verifying 'To cookies' link", () => {
            cy.get('.bb-footer__links').contains("Om cookies")
                .should('have.attr', 'href', 'https://www.bigbank.se/villkor-och-policy?main=14&sec&doc=3901')
        });

        it("Verifying 'Contact' link", () => {
            cy.get('.bb-footer__links').contains("Kontakt")
                .should('have.attr', 'href', 'https://www.bigbank.se/kontakta-oss')
        });

    });

});