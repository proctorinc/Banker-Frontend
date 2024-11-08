# Banker API Frontend
Banker is a GraphQL banking API for fetching bank account and transaction data and statistics. Uses OFX transaction files to upload data from common banks like Chase.

## Libraries
- react > JS interactive UI library (https://github.com/facebook/react)
- vite > React frontend tooling (https://github.com/vitejs/vite)
- apollo-client > GraphQL query and state management (https://github.com/apollographql/apollo-client)
- graphql-codegen > GraphQL code generation (https://github.com/dotansimha/graphql-code-generator)
- tailwindcss > A utility-first CSS framework for rapidly building custom user interfaces. (https://github.com/tailwindlabs/tailwindcss)


## Development
To generate GQL files:
Compile once:
```sh
npm run compile
```
Watch (compile on file change):
```sh
npm run watch
```
