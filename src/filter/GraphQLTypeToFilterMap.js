const { GraphQLString, GraphQLFloat, GraphQLInt } = require("graphql");
const { GraphQLNonNullInt, GraphQLNonNullString } = require("../utils/graphql_utils");
const { NumberFilterInput } = require("./NumberFilterInput");
const { StringFilterInput } = require("./StringFilterInput");

const GraphQLTypeToFilterInputMap = {
    [GraphQLFloat]: NumberFilterInput,
    [GraphQLInt]: NumberFilterInput,
    [GraphQLNonNullInt]: NumberFilterInput,
    [GraphQLNonNullString]: StringFilterInput,
    [GraphQLString]: StringFilterInput
};

module.exports = {
    GraphQLTypeToFilterInputMap
};