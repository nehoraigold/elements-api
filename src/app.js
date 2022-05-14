const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schemas");
const elements = require("../elements");

function createNewApp() {
    const app = express();

    app.post(
        '/graphql',
        graphqlHTTP({
            schema,
            rootValue: { elements },
            graphiql: false
        })
    );
    return app;
}

module.exports = {
    app: createNewApp()
};