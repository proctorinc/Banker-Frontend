import { gql } from "../__generated__";

export const GET_MERCHANT = gql(`
    query getMerchant(
        $id: ID!,
        $first: Int!,
        $after: String,
        $startDate: Date!,
        $endDate: Date!
    ) {
      merchant(id: $id) {
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
        keys {
          id
          keyMatch
          uploadSource
        }
        spendingHistory(input: {
            startDate: $startDate
            endDate: $endDate
        }) {
            month
            balance
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
                merchant {
                    id
                    name
                    sourceId
                    logoUrl
                    linkedAccountId
                    isPrimaryIncome
                }
                category {
                    name
                    color
                    icon
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
