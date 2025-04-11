import { gql } from "../__generated__";

export const GET_ACCOUNT = gql(`
    query getAccount($id: ID!, $first: Int, $after: String) {
      account(id: $id) {
        id
        sourceId
        type
        name
        routingNumber
        logoUrl
        lastTransactionDate
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
    }
`);
