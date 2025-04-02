import { gql } from "../__generated__";

export const GET_ACCOUNT = gql(`
    query getAccount($id: ID!, $first: Int!, $after: String) {
      account(id: $id) {
        id
        sourceId
        type
        name
        routingNumber
        balance
        balanceHistory {
            month
            balance
        }
        lastSync {
            date
            uploadSource
        }
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
                id
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
