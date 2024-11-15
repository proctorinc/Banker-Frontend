import { gql } from "../__generated__";

export const GET_BUDGETS = gql(`
    query getBudgets($first: Int!, $after: String) {
      budgets(page: {
        first: $first
        after: $after
      }) {
        edges {
          node {
            id
            name
            type
            goal
            total
            startDate
            endDate
            allocations(page:{
                first:50
            }) {
            edges {
                node {
                    description
                    amount
                }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
              totalCount
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
