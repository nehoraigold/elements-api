const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const GraphQLNonNullString = new GraphQLNonNull(GraphQLString);
const GraphQLNonNullInt = new GraphQLNonNull(GraphQLInt);

module.exports = {
    GraphQLNonNullInt,
    GraphQLNonNullString
};