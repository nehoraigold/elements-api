const { GraphQLInputObjectType, GraphQLString } = require("graphql");
const { FilterType } = require("./FilterType");


const StringFilterInput = new GraphQLInputObjectType({
    name: "StringFilterInput",
    description: "Filter input for a string type",
    fields: {
        [FilterType.IS]: {
            type: GraphQLString
        },
        [FilterType.INCLUDES]: {
            type: GraphQLString
        },
        [FilterType.EXCLUDES]: {
            type: GraphQLString
        }
    }
});

module.exports = {
    StringFilterInput
};