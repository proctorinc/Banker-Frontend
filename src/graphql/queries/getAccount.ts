import { gql } from "../__generated__";

export const GET_ACCOUNT = gql(`
    query getAccount($id: ID!, $first: Int!, $after: String) {
      account(id: $id) {
        id
        uploadSource
        sourceId
        type
        name
        routingNumber
        transactions(page: {
          first: $first
          after: $after
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
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
            totalCount
          }
        }
      }
    }
`);
