const request = require("supertest");
const { describe, it, before, after } = require("mocha");
const { expect } = require("chai");

const { app } = require("../src/app");

const TEST_ELEMENT = {
    "atomicNumber": 117,
    "symbol": "Ts",
    "name": "Tennessine",
    "atomicMass": 294,
    "electronicConfiguration": "[Rn] 5f14 6d10 7s2 7p5",
    "groupBlock": "post-transition metal",
    "yearDiscovered": "2010",
    "block": "p",
    "period": 7,
    "group": 17
};

const sendRequestWithBody = (body) => {
    return new Promise(async (resolve) => {
        await request(app)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send(body)
            .expect((res) => {
                resolve(res);
            });
    })
};

describe("application", () => {
    let server = null;

    before((done) => {
        server = app.listen((err) => {
            done(err);
        });
    });

    after(() => {
        if (server) {
            server.close();
        }
    });

    it("should return all elements if no filter", async () => {
        // arrange
        const body = { query: '{ elements { name } }' };

        // act
        const { body: { data } } = await sendRequestWithBody(body);

        // assert
        expect(data.elements).to.have.length(118);
        data.elements.forEach((element) => {
            expect(element.name).to.be.a.string;
            expect(element.name).to.have.length.greaterThan(0);
        });
    });

    it("should not return nonexistent requested fields", async () => {
        // arrange
        const body = { query: '{ elements { nonexistentField } }' };

        // act
        const { body: { data, errors } } = await sendRequestWithBody(body);

        // assert
        expect(data).to.be.undefined;
        expect(errors).to.have.length.greaterThan(0);
    });

    describe("filtering", () => {
        Object.entries(TEST_ELEMENT).forEach(([field, value]) => {
            it(`should allow filtering by ${field}`, async () => {
                // arrange
                value = typeof value === "string" ? `"${value}"` : value;
                const body = { query: `{ elements(${field}:${value}) { atomicNumber } }` };

                // act
                const { body: { data } } = await sendRequestWithBody(body);

                // assert
                expect(data.elements).to.have.length.greaterThan(0);
                expect(data.elements.some(({ atomicNumber }) => atomicNumber === TEST_ELEMENT.atomicNumber)).to.be.true;
            })
        });
    });


});