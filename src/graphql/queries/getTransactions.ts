import { gql } from "../__generated__";

export const GET_TRANSACTIONS = gql(`
    query getTransactions($first: Int!, $after: String) {
      transactions(page: {
        first: $first
        after: $after
      }) {
        edges {
          node {
            id
            description
            amount
            payee
            date
            category {
                name
                color
                icon
            }
            merchant {
                id
                name
                sourceId
                logoUrl
                linkedAccountId
                isPrimaryIncome
                linkedCategory {
                    name
                    color
                    icon
                }
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
`);
