![check-code-coverage](https://img.shields.io/badge/code--coverage-96.44%25-brightgreen)

# Alt-Table - Alison Vandromme ![check-code-coverage](https://img.shields.io/badge/code--coverage-96.44%25-brightgreen)

Bordeaux Ynov M1 - Architecture Logicielle (January 2022)

## Application architecture

<img src="./archi-current.jpg">


## Documentation

The documentation is made in OpenAPI 3.0.0 format.
It is generated from swagger.json file and loaded through [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express).

One the application is running, it can be found on localhost:5000/api/docs.
## Workflow

Each feat/* branch is linked to an US on Jira. Keeping the US in the branch name is important for Jira to update the story. 

## Tests

Tests are run with jest. To launch the test suite, run: 

``` sh
npm run test
```
## Utilities

- [check-code-coverage](https://github.com/bahmutov/check-code-coverage)

To update code coverage badge, run: 

```sh
npx update-badge
```

