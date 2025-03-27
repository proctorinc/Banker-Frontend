import { gql } from "../__generated__";

export const GET_SAVINGS_PAGE_DATA = gql(`
    query getSavingsFunds($startDate: Date!, $endDate: Date!, $first: Int!, $after: String) {
      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {
        totalSavings
        unallocated
        savingsHistory {
            month
            year
            saved
            spent
            net
        }
        stats {
          saved
          spent
          net
        }
        funds(page: {first: $first, after: $after}) {
          edges {
            node {
              id
              name
              goal
              total
              startDate
              endDate
              stats(input: {
                  filter: {
                    startDate: $startDate
                    endDate: $endDate
                  }
              }) {
                  saved
                  spent
                  net
              }
              allocations(page: {first: 10}) {
                edges {
                    node {
                        id
                        description
                        amount
                        date
                    }
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
