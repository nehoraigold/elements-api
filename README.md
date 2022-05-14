# Elements API

## Overview

This is a very basic API using GraphQL for retrieving information about the periodic table of elements.

All requests should be `POST` requests sent to the `/graphql` endpoint and with an `application/json` body 
that contains the field `query`. The query should be a valid GraphQL string. See below for examples.

### Query Examples

**Example #1:** Get symbols, atomic masses, and atomic numbers of all elements.

```graphql
{
    elements {
        symbol
        atomicMass
        atomicNumber
    }
}
```

**Example #2:** Get the electron configuration of the element with name "Gold".

```graphql
{
    elements(name: { is: "Gold" }) {
        electronConfiguration
    }
}
```

**Example #3**: Get the names and electronegativities of all d-block elements with an atomic mass between 100 and 200.

```graphql
{
    elements(
        atomicMass: { between: [100, 200] },
        block: { is: "d" }
    ) {
        name
        electronegativity
    }
}
```

## All Element Fields

| Name | Type | Example | Required |
| :--- | :--- | :--- | :--- |
| `atomicNumber` | number | 1 | :heavy_check_mark: |
| `symbol` | string | H | :heavy_check_mark: |
| `name` | string | Hydrogen | :heavy_check_mark: |
| `atomicMass` | number | 1.00794 | :heavy_check_mark: |
| `electronicConfiguration` | string | 1s1 | :heavy_check_mark: |
| `electronegativity` | number | 2.2 |  |
| `atomicRadius` | number | 37 |  |
| `vanDerWaalsRadius` | number | 120 |  |
| `ionizationEnergy` | number | 1312 |  |
| `electronAffinity` | number | -73 |  |
| `oxidationStates` | object | -1,1 |  |
| `standardState` | string | gas |  |
| `bondingType` | string | diatomic |  |
| `meltingPoint` | number | 14 |  |
| `boilingPoint` | number | 20 |  |
| `density` | number | 0.0000899 |  |
| `groupBlock` | string | nonmetal | :heavy_check_mark: |
| `yearDiscovered` | string | 1766 | :heavy_check_mark: |
| `block` | string | s | :heavy_check_mark: |
| `cpkHexColor` | string | FFFFFF |  |
| `period` | number | 1 | :heavy_check_mark: |
| `group` | number | 1 | :heavy_check_mark: | :--- | :--- |
| `atomicNumber` | number | 1 | :heavy_check_mark: |
| `symbol` | string | H | :heavy_check_mark: |
| `name` | string | Hydrogen | :heavy_check_mark: |
| `atomicMass` | number | 1.00794 | :heavy_check_mark: |
| `electronicConfiguration` | string | 1s1 | :heavy_check_mark: |
| `electronegativity` | number | 2.2 |  |
| `atomicRadius` | number | 37 |  |
| `vanDerWaalsRadius` | number | 120 |  |
| `ionizationEnergy` | number | 1312 |  |
| `electronAffinity` | number | -73 |  |
| `oxidationStates` | object | -1,1 |  |
| `standardState` | string | gas |  |
| `bondingType` | string | diatomic |  |
| `meltingPoint` | number | 14 |  |
| `boilingPoint` | number | 20 |  |
| `density` | number | 0.0000899 |  |
| `groupBlock` | string | nonmetal | :heavy_check_mark: |
| `yearDiscovered` | string | 1766 | :heavy_check_mark: |
| `block` | string | s | :heavy_check_mark: |
| `cpkHexColor` | string | FFFFFF |  |
| `period` | number | 1 | :heavy_check_mark: |
| `group` | number | 1 | :heavy_check_mark: |

## Filters

### String Filter Inputs

| Type | Description | Example |
|:---   |:---    |:---  |
| `is` | Matches exactly, case-insensitive | `elements(symbol: { is: "He" }) { ... }` |
| `includes` | The string is present anywhere, case-insensitive | `elements(name: { includes: "ium" }) { ... }` |
| `excludes` | The string is not present anywhere, case-insensitive | `elements(electronConfiguration: { excludes: "p5" }) { ... }` |


### Number Filter Inputs

| Type | Description | Example |
|:---   | :---    | :---  |
| `gt` | Greater than | `elements(atomicNumber: { gt: 100 }) { ... }` |
| `ge` | Greater than or equal to | `elements(atomicNumber: { ge: 101 }) { ... }` |
| `equals` | Equals exactly | `elements(atomicNumber: { equals: 1 }) { ... }` |
| `le` | Less than or equal to | `elements(meltingPoint: { le: 0 }) { ... }` |
| `lt` | Less than | `elements(boilingPoint: { lt: 100 }) { ... }` |
| `between` | In between the two provided numbers in the form of [lower, higher] and including both | `elements(boilingPoint: { between: [0, 100] }) { ... }` |
| `approximately` | Approximately equal to a given value plus a margin of error in the form of [targetValue, margin] | `elements(atomicMass: { approximately: [16, 0.5] }) { ... }` |

## Running the App

1. Clone the repository.
2. Run `npm install`.
3. Run `npm run start`.

## Running the Tests

1. Run `npm run test`.
