const { GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = require("graphql");

const ElementFieldTypes = {
    name: {
        type: GraphQLString
    },
    symbol: {
        type: GraphQLString
    },
    atomicNumber: {
        type: GraphQLInt
    },
    atomicMass: {
        type: GraphQLFloat
    },
    electronicConfiguration: {
        type: GraphQLString
    },
    electronegativity: {
        type: GraphQLInt
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
        type: GraphQLString
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
        type: GraphQLString
    },
    yearDiscovered: {
        type: GraphQLString
    },
    block: {
        type: GraphQLString
    },
    cpkHexColor: {
        type: GraphQLString
    },
    period: {
        type: GraphQLInt
    },
    group: {
        type: GraphQLInt
    }
};

const Element = new GraphQLObjectType({
    name: "element",
    fields: (() => {
        const fieldsWithResolve = {};
        const fieldsAsArray = Object.entries(ElementFieldTypes)
            .map(([fieldName, fieldValue]) => {
                return [fieldName, {
                    ...fieldValue,
                    resolve: (el) => el[fieldName]
                }];
            });
        for (const [name, val] of fieldsAsArray) {
            fieldsWithResolve[name] = val;
        }
        return fieldsWithResolve;
    })()
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            elements: {
                args: { ...ElementFieldTypes },
                type: new GraphQLList(Element),
                resolve: (parent, args) => {
                    let elements = parent.elements.concat(); // copy
                    for (const [filterKey, filterValue] of Object.entries(args)) {
                        elements = elements.filter((el) => el[filterKey] === filterValue);
                    }
                    return elements;
                }
            }
        }
    })
});

module.exports = { schema, ElementFieldTypes };