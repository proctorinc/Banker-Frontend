import { gql } from "../__generated__";

export const GET_MERCHANT_KEYS = gql(`
    query merchantKeys($merchantIds: [String!]!) {
      merchantKeys(merchantIds: $merchantIds) {
        id
        keyMatch
        uploadSource
      }
    }
`);
