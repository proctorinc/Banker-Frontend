import { gql } from "../__generated__";

export const GET_MERCHANT = gql(`
    query getMerchant($merchantId: ID!) {
      merchant(id:$merchantId) {
        id
        name
        ownerId
        sourceId
        keys {
          id
          keyMatch
          uploadSource
        }
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
              endCursor
              startCursor
              totalCount
            }
          }
        }
      }
`);
