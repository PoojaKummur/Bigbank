const baseURL = 'https://ansokan.bigbank.se/api/v1/loan/calculate';

class jsonBody  {
    constructor(maturity = 12, loanAmount = 120000, productType = 'LOANSE02', interestRate = 10.95, monthlyPaymentDay = 27) {
        this.maturity = maturity
        this.loanAmount =loanAmount;
        this.productType =productType;
        this.interestRate =interestRate;
        this.monthlyPaymentDay =monthlyPaymentDay;
    }
}

const jsonBodyBudilder = (body) => {
    const jsonBodyValues = {
        "maturity": body.maturity,
        "productType": body.productType,
        "amount": body.loanAmount,
        "interestRate": body.interestRate,
        "monthlyPaymentDay": body.monthlyPaymentDay,
        "administrationFee": 40,
        "conclusionFee": 695,
        "currency": "SEK"
    };
    return jsonBodyValues;
}

describe("API validation tests", () => {

    it("Positive scenario: Verify Calculate Modal API response", () => {
        let obj1  = new jsonBody();
        const body = jsonBodyBudilder(obj1);
        cy.request('POST', baseURL , body).then(
            (response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('totalRepayableAmount');
            }).its('body').then((body) => {
            //Verifying the values to be
            cy.log("Validating API response");
            expect(body.totalRepayableAmount).gt(obj1.loanAmount);
            expect(body.totalRepayableAmount).gt(0);
            expect(body.monthlyPayment).gt((obj1.loanAmount/obj1.maturity));
            expect(body.monthlyPayment).gt(0);
        });

    });

    //Currently, this test is failing due to defect
    it("Negative scenario: Input negative loan amount value and verify response", () => {
        let obj1  = new jsonBody();
        obj1.loanAmount = -120000;

        const body = jsonBodyBudilder(obj1);
        cy.request('POST', baseURL, body).then(
            (response) => {
                cy.log(response);
                //Currently, this test is failing due to defect
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('totalRepayableAmount');
            }).its('body').then((body) => {
            //Verifying the values to be
            cy.log("Validating API response");
            expect(body.dataPath).eq(".amount");
        });
    });

    //Currently, this test is failing due to defect
    it("Negative scenario: Input negative maturity value and verify response via cls", () => {
        let obj1  = new jsonBody();
        obj1.maturity = -12;

        const body = jsonBodyBudilder(obj1);
        cy.request('POST', baseURL, body).then(
            (response) => {
                cy.log(response);
                //Currently, this test is failing due to defect
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('totalRepayableAmount');
            }).its('body').then((body) => {
            //Verifying the values to be
            cy.log("Validating API response");
            expect(body.dataPath).eq(".maturity");
        });
    });

    it("Negative scenario: Input incorrect data type for maturity field", () => {
        let obj1  = new jsonBody();
        obj1.maturity = "ab";

        const body = jsonBodyBudilder(obj1);
        cy.request({method:'POST', url: baseURL, body, failOnStatusCode: false}).then(
            (response) => {
                cy.log(response);
                expect(response.status).to.eq(400);
            }).its('body').then((body) => {
            //Verifying the response values
            expect(body[0].dataPath).eq(".maturity");
            expect(body[0].message).eq("should be number");
        });
    });

    it("Negative scenario: Input incorrect data type for amount field", () => {
        let obj1  = new jsonBody();
        obj1.loanAmount = "&^%";

        const body = jsonBodyBudilder(obj1);
        cy.request({method:'POST', url: baseURL, body, failOnStatusCode: false}).then(
            (response) => {
                cy.log(response);
                expect(response.status).to.eq(400);
            }).its('body').then((body) => {
            //Verifying the response values
            expect(body[0].dataPath).eq(".amount");
            expect(body[0].message).eq("should be number");
        });
    });

    //Incorrect monthlyPaymentDay range, defect
    it("Negative scenario: Input incorrect date range for monthlyPaymentDay field", () => {
        let obj1  = new jsonBody();
        obj1.monthlyPaymentDay = 0;

        const body = jsonBodyBudilder(obj1);
        cy.request({method:'POST', url: baseURL, body, failOnStatusCode: false}).then(
            (response) => {
                cy.log(response);
                //Currently, this test is failing due to defect
                expect(response.status).to.eq(400);
            }).its('body').then((body) => {
            //Verifying the response values
            expect(body[0].dataPath).eq(".monthlyPaymentDay");
            expect(body[0].message).eq("should be within range of 1 to 31");
        });
    });

    //Incorrect monthlyPaymentDay, defect
    it("Negative scenario: Input incorrect date range for monthlyPaymentDay field e.g. 32", () => {
        let obj1  = new jsonBody();
        obj1.monthlyPaymentDay = 32;

        const body = jsonBodyBudilder(obj1);
        cy.request({method:'POST', url: baseURL, body, failOnStatusCode: false}).then(
            (response) => {
                cy.log(response);
                //Currently, this test is failing due to defect
                expect(response.status).to.eq(400);
            }).its('body').then((body) => {
            //Verifying the response values
            cy.log("Test case failed");
        });
    });

});