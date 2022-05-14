const { FilterType } = require("./FilterType");
const { ElementFieldTypes } = require("../fields");
const { GraphQLTypeToFilterInputMap } = require("./GraphQLTypeToFilterMap");

const filterElement = (element, fieldName, filterInput) => {
    let shouldInclude = true;
    const value = element[fieldName];
    for (const [filterType, filterVal] of Object.entries(filterInput)) {
        switch (filterType) {
            case FilterType.IS:
                shouldInclude = shouldInclude && value.toLowerCase() === filterVal.toLowerCase();
                break;
            case FilterType.INCLUDES:
                shouldInclude = shouldInclude && value.toLowerCase().includes(filterVal.toLowerCase());
                break;
            case FilterType.EXCLUDES:
                shouldInclude = shouldInclude && !value.toLowerCase().includes(filterVal.toLowerCase());
                break;
            case FilterType.EQUALS:
                shouldInclude = shouldInclude && value === filterVal;
                break;
            case FilterType.LESS_THAN:
                shouldInclude = shouldInclude && value < filterVal;
                break;
            case FilterType.LESS_THAN_EQUAL_TO:
                shouldInclude = shouldInclude && value <= filterVal;
                break;
            case FilterType.GREATER_THAN_EQUAL_TO:
                shouldInclude = shouldInclude && value >= filterVal;
                break;
            case FilterType.GREATER_THAN:
                shouldInclude = shouldInclude && value > filterVal;
                break;
            case FilterType.BETWEEN: {
                const lowEnd = filterVal[0];
                const highEnd = filterVal[1];
                shouldInclude = shouldInclude && value >= lowEnd && value < highEnd;
                break;
            }
            case FilterType.APPROXIMATELY: {
                const targetValue = filterVal[0];
                const errorMargin = filterVal[1];
                const lowEnd = targetValue - errorMargin;
                const highEnd = targetValue + errorMargin;
                shouldInclude = shouldInclude && value >= lowEnd && value <= highEnd;
                break;
            }
        }
    }
    return shouldInclude;
};


const getFilterArgs = () => {
    const fieldsWithFilters = {};
    const fieldsAsArray = Object.entries(ElementFieldTypes)
        .map(([fieldName, fieldValue]) => {
            const filterType = GraphQLTypeToFilterInputMap[fieldValue.type];
            if (!filterType) {
                return [];
            }
            return [fieldName, {
                type: filterType,
                fields: filterType.getFields()
            }];
        });
    for (const [name, val] of fieldsAsArray) {
        if (!name || !val) {
            continue;
        }
        fieldsWithFilters[name] = val;
    }
    return fieldsWithFilters;
};

module.exports = {
    filterElement,
    getFilterArgs
};