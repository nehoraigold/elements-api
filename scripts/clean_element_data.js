const process = require("process");
const { writeFileSync } = require("fs");
const { GraphQLString, GraphQLInt, GraphQLFloat } = require("graphql");

const elements = require("../elements");
const { ElementFieldTypes } = require("../src/schemas");

const GRAPHQL_TYPES_TO_NODE_TYPES = {
    [GraphQLInt]: "number",
    [GraphQLFloat]: "number",
    [GraphQLString]: "string",
};

let shouldFix = false;

function main() {
    console.log("Verifying element data...");
    shouldFix = process.argv[2] === "fix";

    let changed = false;
    elements.forEach((element, i) => {
        console.log(`Element: ${element.name}`);
        changed = confirmElementFields(element, i);
    });

    if (changed) {
        const newFilePath = "./elements_modified.json";
        writeFileSync(newFilePath, JSON.stringify(elements, null, 4));
        console.log(`New file available here: ${newFilePath}`);
    }

    console.log("Data verification complete 🎉 ");
}

function confirmElementFields(element, index) {
    const messages = [];
    let changed = false;

    for (const [key, value] of Object.entries(element)) {
        const expectedGraphQLType = ElementFieldTypes[key].type;
        const expectedType = GRAPHQL_TYPES_TO_NODE_TYPES[expectedGraphQLType] || "object";

        if (shouldFix && value === "unknown") {
            delete elements[index][key];
            messages.push(`unknown value for key ${key} was deleted 🛠`);
            changed = true;
        } else if (typeof value !== expectedType) {
            if (shouldFix) {
                const newValue = getCorrectedValue(key, value, index);
                if (newValue === value) {
                    messages.push(`${key} should be ${expectedType}, not ${typeof value}! ❌️`);
                } else {
                    messages.push(`${key} had incorrect value ${value}, changed to ${newValue} 🛠`);
                    elements[index][key] = newValue;
                    changed = true;
                }
            }
        }
    }

    if (messages.length === 0) {
        messages.push("All fields valid ✅ ");
    }

    console.log(messages.map((msg) => ` ==> ${msg}`).join('\n'));
    return changed;
}

function getCorrectedValue(key, incorrectValue) {
    switch (key) {
        case "atomicMass":
            return modifyAtomicMass(incorrectValue);
        case "oxidationStates":
            return modifyOxidationStates(incorrectValue);
        case "yearDiscovered":
            return modifyYearDiscovered(incorrectValue);
        default:
            return incorrectValue;
    }
d
}

function modifyAtomicMass(incorrectValue) {
    const REGEX = /(\d+\.?\d*)\(\d*\)/;
    if (REGEX.test(incorrectValue)) {
        return parseFloat(incorrectValue.match(REGEX)[1]);
    }
    if (Array.isArray(incorrectValue) && incorrectValue.length === 1 && typeof incorrectValue[0] === "number") {
        return incorrectValue[0];
    }
    return incorrectValue;
}

function modifyOxidationStates(incorrectValue) {
    if (typeof incorrectValue === "number") {
        return [incorrectValue];
    }
    if (typeof incorrectValue === "string") {
        if (incorrectValue === "unknown") {
            return [];
        }
        return incorrectValue.split(", ").map((el) => parseInt(el));
    }
    return incorrectValue;
}

function modifyYearDiscovered(incorrectValue) {
    if (typeof incorrectValue === "number") {
        return `${incorrectValue}`;
    }
    return incorrectValue;
}

main();