import { gql } from "../__generated__/gql";

export const GET_STATS = gql(`
  query getStats($startDate: Date!, $endDate: Date!) {
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
                description
                amount
                date
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
                description
                amount
                date
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
        transactions(page: {
            first: 5
        }) {
            edges {
                node {
                description
                amount
                date
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
  }
`);
