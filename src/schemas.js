const { GraphQLSchema, GraphQLList, GraphQLObjectType } = require("graphql");

const { ElementFieldTypes } = require("./fields");
const { filterElement, getFilterArgs } = require("./filter/filters");

const getElementFields = () => {
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
};

const Element = new GraphQLObjectType({
    name: "element",
    fields: getElementFields()
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            elements: {
                args: getFilterArgs(),
                type: new GraphQLList(Element),
                resolve: (parent, args) => {
                    let elements = parent.elements.concat(); // copy
                    if (!args) {
                        return elements;
                    }
                    for (const [filterKey, filterValue] of Object.entries(args)) {
                        console.log(filterKey, filterValue);
                        elements = elements.filter((el) => filterElement(el, filterKey, filterValue));
                    }
                    return elements;
                }
            }
        }
    })
});

module.exports = { schema, ElementFieldTypes };