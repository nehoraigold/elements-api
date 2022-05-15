const { FilterType } = require("./FilterType");
const { ElementFieldTypes } = require("../fields");
const { GraphQLTypeToFilterInputMap } = require("./GraphQLTypeToFilterMap");

const applyFilter = (value, filterType, filterVal) => {
    if (!value) {
        return false;
    }

    switch (filterType) {
        case FilterType.IS:
            return value.toLowerCase() === filterVal.toLowerCase();
        case FilterType.INCLUDES:
            return value.toLowerCase().includes(filterVal.toLowerCase());
        case FilterType.EXCLUDES:
            return !value.toLowerCase().includes(filterVal.toLowerCase());
        case FilterType.IN:
            return filterVal.map((val) => val.toLowerCase()).includes(value.toLowerCase());
        case FilterType.EQUALS:
            return value === filterVal;
        case FilterType.LESS_THAN:
            return value < filterVal;
        case FilterType.LESS_THAN_EQUAL_TO:
            return value <= filterVal;
        case FilterType.GREATER_THAN_EQUAL_TO:
            return value >= filterVal;
        case FilterType.GREATER_THAN:
            return value > filterVal;
        case FilterType.BETWEEN: {
            const lowEnd = filterVal[0];
            const highEnd = filterVal[1];
            return value >= lowEnd && value <= highEnd;
        }
        case FilterType.APPROXIMATELY: {
            const targetValue = filterVal[0];
            const errorMargin = filterVal[1];
            const lowEnd = targetValue - errorMargin;
            const highEnd = targetValue + errorMargin;
            return value >= lowEnd && value <= highEnd;
        }
        default:
            return true;
    }
};

const filterElement = (element, fieldName, filterInput) => {
    let shouldInclude = true;
    const value = element[fieldName];
    for (const [filterType, filterVal] of Object.entries(filterInput)) {
        shouldInclude = shouldInclude && applyFilter(value, filterType, filterVal);
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