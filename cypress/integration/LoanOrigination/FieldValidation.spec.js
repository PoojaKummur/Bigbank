describe("Field validation tests", () => {

    //Test scenarios related to First name field
    context("First Name field validation", () => {

        before(() => {
            cy.visit('https://ansokan.bigbank.se/');
        });

        //Removing any error messages and resetting firstname field value
        afterEach(() => {
            cy.get('#firstNameField').clear();
            cy.get('#firstNameField').type('Pooja');
            cy.get('.bb-public-header__title').click();
            cy.get('#firstNameField').clear();
        });

        it("Positive scenario, valid first name with english alphabets", () => {
            cy.get('#firstNameField').type('Pooja Kummur');
            //clicking on any other field or header to induce field validation for First Name
            cy.get('.bb-public-header__title').click();

            //Validating there are no error message
            cy.get('[data-vv-as="Förnamn"] > .error-message').should('not.exist');
        })

        it("Positive scenario, valid first name with umlaut chars", () => {
            cy.get('#firstNameField').type('Günter Jürgen ä ö ü');
            //clicking on any other field or header to induce field validation for First Name
            cy.get('.bb-public-header__title').click();

            //Validating there are no error message
            cy.get('[data-vv-as="Förnamn"] > .error-message').should('not.exist');
        })

        it("Negative scenario, first name with numbers", () => {
            cy.get('#firstNameField').type('Pooja Kummur 1234');
            //clicking on any other field or header to induce field validation for First Name
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('[data-vv-as="Förnamn"] > .error-message').should('be.visible');
            cy.get('#firstNameField').siblings('.input-addon-wrapper').should('be.visible');
        })

        it("Negative scenario, first name with special chars", () => {
            cy.get('#firstNameField').type('Pooja Kummur &*^%');
            //clicking on any other field or header to induce field validation for First Name
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#firstNameField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Förnamn"] > .error-message').should('be.visible');
        })

        it("Negative scenario, no first name entered", () => {
            cy.get('#firstNameField').click();
            //clicking on any other field or header to induce field validation for First Name
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#firstNameField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Förnamn"] > .error-message')
                .should('be.visible')
                .contains("Fältet Förnamn är obligatoriskt");
        })

        it("Negative scenario, min 2 chars must be entered for first name", () => {
            cy.get('#firstNameField').type('a');
            //clicking on any other field or header to induce field validation for First Name
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#firstNameField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Förnamn"] > .error-message')
                .should('be.visible')
                .contains("Fältet Förnamn måste minst vara 2 tecken");
        })
    })

    //Test scenarios related to Surname field
    context("Surname field validation", () => {

        before(() => {
            cy.visit('https://ansokan.bigbank.se/');
        });

        //Resetting firstname field
        afterEach(() => {
            cy.get('#surnameField').clear();
            cy.get('#surnameField').type('Kummur');
            cy.get('.bb-public-header__title').click();
            cy.get('#surnameField').clear();
        });

        it("Positive scenario, valid surname with english alphabets", () => {
            cy.get('#surnameField').type('Shivananda');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Validating there are no error message
            cy.get('[data-vv-as="Efternamn"] > .error-message').should('not.exist');
        })

        it("Positive scenario, valid surname with umlaut chars", () => {
            cy.get('#surnameField').type('Günter Jürgen ä ö ü');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Validating there are no error message
            cy.get('[data-vv-as="Efternamn"] > .error-message').should('not.exist');
        })

        it("Negative scenario, surname with numbers", () => {
            cy.get('#surnameField').type('Pooja Kummur 1234');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('[data-vv-as="Efternamn"] > .error-message').should('be.visible');
            cy.get('#surnameField').siblings('.input-addon-wrapper').should('be.visible');
        })

        it("Negative scenario, surname with special chars", () => {
            cy.get('#surnameField').type('Pooja Kummur &*^%');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#surnameField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Efternamn"] > .error-message').should('be.visible');
        })

        it("Negative scenario, no surname entered", () => {
            cy.get('#surnameField').click();
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#surnameField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Efternamn"] > .error-message')
                .should('be.visible')
                .contains("Fältet Efternamn är obligatoriskt");
        })

        it("Negative scenario, min 2 chars must be entered for surname", () => {
            cy.get('#surnameField').type('a');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#surnameField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Efternamn"] > .error-message')
                .should('be.visible')
                .contains("Fältet Efternamn måste minst vara 2 tecken");
        })
    })

    //Test scenarios related to Personal identity number field
    context("Personal identity number field validation", () => {
        before(() => {
            cy.visit('https://ansokan.bigbank.se/');
        });

        //Resetting firstname field
        afterEach(() => {
            cy.get('#personalIdentityCodeField').clear();
            cy.get('#personalIdentityCodeField').type('811228-9874');
            cy.get('.bb-public-header__title').click();
            cy.get('#personalIdentityCodeField').clear();
        });

        it("Positive scenario, valid Personal identity number", () => {
            cy.get('#personalIdentityCodeField').type('670919-9530');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Validating there are no error message
            cy.get('[data-vv-as="Personnummer"] > .error-message').should('not.exist');
        })

        it("Negative scenario, incorrect Personal identity number", () => {
            cy.get('#personalIdentityCodeField').type('811228-9878');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#personalIdentityCodeField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Personnummer"] > .error-message')
                .should('be.visible')
                .contains("Personnummer måste vara i formatet ÅÅMMDD-XXXX");
        })

        it("Negative scenario, no Personal identity number entered", () => {
            cy.get('#personalIdentityCodeField').click();
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#personalIdentityCodeField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Personnummer"] > .error-message')
                .should('be.visible')
                .contains("Fältet Personnummer är obligatoriskt");
        })
    })

    //Test scenarios related to email field
    context("Email field validation", () => {
        before(() => {
            cy.visit('https://ansokan.bigbank.se/');
        });

        //Resetting firstname field
        afterEach(() => {
            cy.get('#emailField').clear();
            cy.get('#emailField').type('pooja@gmail.com');
            cy.get('.bb-public-header__title').click();
            cy.get('#emailField').clear();
        });

        it("Positive scenario, valid email field", () => {
            cy.get('#emailField').type('pooja@gmail.com');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Validating there are no error message
            cy.get('[data-vv-as="E-postadress"] > .error-message').should('not.exist');
        })

        it("Negative scenario, invalid email field", () => {
            cy.get('#emailField').type('invalidemail.com');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('#emailField').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="E-postadress"] > .error-message')
                .should('be.visible')
                .contains("Fältet E-postadress måste vara en giltig e-postadress");
        })
    })

    //Test scenarios related to phone number field
    context("Phone number field validation", () => {
        before(() => {
            cy.visit('https://ansokan.bigbank.se/');
        });

        //Resetting phone number field
        afterEach(() => {
            cy.get('[name="phone"]').clear();
            cy.get('[name="phone"]').type('787776676');
            cy.get('.bb-public-header__title').click();
            cy.get('[name="phone"]').clear();
        });

        it("Positive scenario, valid phone number field", () => {
            cy.get('[name="phone"]').type('787723235');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Validating there are no error message
            cy.get('[data-vv-as="Mobilnummer"] > .error-message').should('not.exist');

            //Validating country code for phone number
            cy.get('[data-vv-as="Mobilnummer"]').find('button').contains('+46');
        })

        it("Negative scenario, invalid 9 digit phone number starting with anything other than 7", () => {
            cy.get('[name="phone"]').type('987723235');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('[name="phone"]').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Mobilnummer"] > .error-message')
                .should('be.visible')
                .contains("Mobilnummer måste vara ett mobilnummer i formatet +467XXXXXXXX");
        })

        it("Negative scenario, phone number starting with 7 less than 9 digits", () => {
            cy.get('[name="phone"]').type('78772323');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('[name="phone"]').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Mobilnummer"] > .error-message')
                .should('be.visible')
                .contains("Mobilnummer måste vara ett mobilnummer i formatet +467XXXXXXXX");
        })

        it("Negative scenario, phone number starting with 7 more than 9 digits", () => {
            cy.get('[name="phone"]').type('7877232386');
            //clicking on any other field or header to induce field validation
            cy.get('.bb-public-header__title').click();

            //Verify there is an error message and error symbol
            cy.get('[name="phone"]').siblings('.input-addon-wrapper').should('be.visible');
            cy.get('[data-vv-as="Mobilnummer"] > .error-message')
                .should('be.visible')
                .contains("Mobilnummer måste vara ett mobilnummer i formatet +467XXXXXXXX");
        })
    })

    //Test scenarios related to phone number field
    context("Borrowing purpose field validation", () => {
        before(() => {
            cy.visit('https://ansokan.bigbank.se/');
        });

        it('Validating Borrowing purpose field all values', function () {
            const borrowingValues = ['', "DAILY_SETTLEMENTS", "PURCHASING_OTHER_REAL_ESTATE",
                "ACQUIRING_SECURITIES", "STARTING_COMMERCIAL_ACTIVITY", "EXPANDING_COMMERCIAL_ACTIVITY",
                "RENOVATING_HOME", "PURCHASING_MOTOR_VEHICLES", "ACQUIRING_EDUCATION", "OTHER", "TRAVELING"];

            cy.get('#loanPurposeField option').then(options => {
                const actual = [...options].map(o => o.value)
                expect(actual).to.deep.eq(borrowingValues)
            })

        });
    });

})
