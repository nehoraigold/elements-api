const { readFileSync, writeFileSync } = require("fs");
const elements = require("../elements");

const README_FIELDS_HEADER = "## All Element Fields";
const README_PATH = "./README.md";
const EXAMPLE_ELEMENT_INDEX = 0;


function main() {
    const fieldArray = createFieldArrayBasedOnElementWithIndex(EXAMPLE_ELEMENT_INDEX);
    confirmRequiredFields(fieldArray);
    const table = convertArrayToReadmeTable(fieldArray);
    updateReadmeFile(table);
}

function createFieldArrayBasedOnElementWithIndex(index) {
    return Object.entries(elements[index])
        .map(([field, value]) => {
            return {
                name: field,
                example: value,
                type: typeof value,
                required: true
            }
        });
}

function confirmRequiredFields(fieldArray) {
    for (const fieldInfo of fieldArray) {
        for (const element of elements) {
            if (!element[fieldInfo.name]) {
                fieldInfo.required = false;
                break;
            }
        }
    }
}

function convertArrayToReadmeTable(fieldArray) {
    const tableRows = [
        `| Name | Type | Example | Required |`,
        `| :--- | :--- | :--- | :--- |`
    ];
    return tableRows.concat(fieldArray.map(buildRow)).join("\n");
}

function buildRow({ name, example, type, required}) {
    return `| \`${name}\` | ${type} | ${example} | ${required ? ":heavy_check_mark:" : ""} |`;
}

function updateReadmeFile(table) {
    const readme = readFileSync(README_PATH, 'utf8');
    const startReplaceIndex = readme.indexOf(README_FIELDS_HEADER) + README_FIELDS_HEADER.length + "\n".length;
    const endReplaceIndex = startReplaceIndex + readme.substring(startReplaceIndex).search(/\n[^|]/);
    const newReadme = readme.substring(0, startReplaceIndex) + table + readme.substring(endReplaceIndex);
    writeFileSync(README_PATH, newReadme);
}

main();