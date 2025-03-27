import { gql } from "../__generated__";

export const GET_MERCHANTS = gql(`
    query getMerchants {
        merchants {
            edges {
                node {
                    id
                    name
                    sourceId
                    ownerId
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
