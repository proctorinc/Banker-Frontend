import { gql } from "../__generated__";

export const GET_MERCHANTS = gql(`
    query getMerchants {
        merchants {
            edges {
                node {
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
                    transactions(page: {
                        first: 5
                    }) {
                        # edges {
                        #     node {
                        #     description
                        #     payee
                        #     amount
                        #     date
                        #     }
                        # }
                        pageInfo {
                            # hasNextPage
                            # hasPreviousPage
                            totalCount
                        }
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
`);
