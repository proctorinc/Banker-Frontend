import { gql } from "../__generated__/gql";

export const GET_STATS = gql(`
  query getStats($startDate: Date!, $endDate: Date!) {
      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {
        totalSavings
        unallocated
        stats {
          saved
          spent
          net
        }
      }
    spending(
        input: {
            filter: {
                startDate: $startDate
                endDate: $endDate
            }
        }
    ) {
        total
        transactions(page: {
            first: 5
        }) {
            edges {
                node {
                  id
                  description
                  amount
                  payee
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
                totalCount
            }
        }
    }
    income(
        input: {
            filter: {
                startDate: $startDate
                endDate: $endDate
            }
        }
    ) {
        total
        transactions(page: {
            first: 5
        }) {
            edges {
                node {
                  id
                  description
                  amount
                  payee
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
                totalCount
            }
        }
    }
    net(
        input: {
            filter: {
                startDate: $startDate
                endDate: $endDate
            }
        }
    ) {
        total
    }
  }
`);
