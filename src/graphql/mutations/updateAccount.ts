import { gql } from "../__generated__/gql";

export const UPDATE_ACCOUNT = gql(`
    mutation updateAccount(
        $id: ID!
        $name: String
        $initialBalance: Float
        $logoUrl: String
    ) {
        updateAccount(input: {
            id: $id
            name: $name
            initialBalance: $initialBalance
            logoUrl: $logoUrl
        }) {
            id
            sourceId
            type
            name
            routingNumber
        }
    }
`);
