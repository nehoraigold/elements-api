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

## Running the App

1. Clone the repository.
2. Run `npm install`.
3. Run `npm run start`.

## Running the Tests

1. Run `npm run test`.
