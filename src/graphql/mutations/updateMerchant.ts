import { gql } from "../__generated__/gql";

export const UPDATE_MERCHANT = gql(`
    mutation updateMerchant(
        $id: ID!
        $name: String
        $isPrimaryIncome: Boolean
        $logoUrl: String
        $accountId: ID
    ) {
        updateMerchant(input: {
            id: $id
            name: $name
            isPrimaryIncome: $isPrimaryIncome
            logoUrl: $logoUrl
            accountId: $accountId
        }) {
            id
            name
            sourceId
            logoUrl
            linkedAccountId
        }
    }
`);
