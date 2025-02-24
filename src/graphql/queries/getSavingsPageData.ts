import { gql } from "../__generated__";

export const GET_SAVINGS_PAGE_DATA = gql(`
    query getSavingsFunds($startDate: Date!, $endDate: Date!, $first: Int!, $after: String) {
      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {
        stats {
          totalSavings
          saved
          spent
          unallocated
        }
        funds(page: {first: $first, after: $after}) {
          edges {
            node {
              id
              name
              type
              goal
              total
              startDate
              endDate
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
