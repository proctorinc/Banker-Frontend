import { gql } from "../__generated__";

export const GET_ACCOUNT = gql(`
    query getAccount($id: ID!) {
      account(id: $id) {
        id
        uploadSource
        sourceId
        type
        name
        routingNumber
        transactions(page: {
          first: 10
        }) {
          edges {
            node {
              description
              amount
              date
              merchant {
                name
                sourceId
              }
            }
            cursor
          }
        }
      }
    }
`);
