import { gql } from "../__generated__/gql";

export const MERGE_MERCHANTS = gql(`
    mutation mergeMerchants(
        $name: String!,
        $merchantIds: [String!]!,
        $keyMatches: [CreateMerchantKey!]!,
    ) {
        mergeMerchants(input: {
            name: $name
            merchantIds: $merchantIds
            keyMatches: $keyMatches
        }) {
            id
            name
            sourceId
        }
    }
`);
