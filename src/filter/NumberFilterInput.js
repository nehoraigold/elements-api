const { GraphQLInputObjectType, GraphQLFloat, GraphQLList } = require("graphql");
const { FilterType } = require("./FilterType");

const NumberFilterInput = new GraphQLInputObjectType({
    name: "NumberFilterInput",
    description: "Filter input for a number type",
    fields: {
        [FilterType.GREATER_THAN]: {
            type: GraphQLFloat
        },
        [FilterType.GREATER_THAN_EQUAL_TO]: {
            type: GraphQLFloat
        },
        [FilterType.EQUALS]: {
            type: GraphQLFloat
        },
        [FilterType.LESS_THAN_EQUAL_TO]: {
            type: GraphQLFloat
        },
        [FilterType.LESS_THAN]: {
            type: GraphQLFloat
        },
        [FilterType.BETWEEN]: {
            type: new GraphQLList(GraphQLFloat)
        },
        [FilterType.APPROXIMATELY]: {
            type: new GraphQLList(GraphQLFloat)
        }
    }
});

module.exports = {
    NumberFilterInput
};