const { GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList } = require("graphql");
const { GraphQLNonNullString, GraphQLNonNullInt } = require("./utils/graphql_utils");

const ElementFieldTypes = {
    name: {
        type: GraphQLNonNullString
    },
    symbol: {
        type: GraphQLNonNullString
    },
    atomicNumber: {
        type: GraphQLNonNullInt
    },
    atomicMass: {
        type: GraphQLFloat
    },
    electronicConfiguration: {
        type: GraphQLNonNullString
    },
    electronegativity: {
        type: GraphQLFloat
    },
    atomicRadius: {
        type: GraphQLInt
    },
    ionRadius: {
        type: GraphQLString
    },
    vanDerWaalsRadius: {
        type: GraphQLInt
    },
    ionizationEnergy: {
        type: GraphQLInt
    },
    electronAffinity: {
        type: GraphQLInt
    },
    oxidationStates: {
        type: new GraphQLList(GraphQLInt)
    },
    standardState: {
        type: GraphQLNonNullString
    },
    bondingType: {
        type: GraphQLString
    },
    meltingPoint: {
        type: GraphQLFloat
    },
    boilingPoint: {
        type: GraphQLFloat
    },
    density: {
        type: GraphQLFloat
    },
    groupBlock: {
        type: GraphQLNonNullString
    },
    yearDiscovered: {
        type: GraphQLString
    },
    block: {
        type: GraphQLNonNullString
    },
    cpkHexColor: {
        type: GraphQLString
    },
    period: {
        type: GraphQLNonNullInt
    },
    group: {
        type: GraphQLNonNullInt
    }
};

module.exports = {
    ElementFieldTypes
};