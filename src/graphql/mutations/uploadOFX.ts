import { gql } from "../__generated__/gql";

export const UPLOAD_OFX = gql(`
    mutation uploadOFX($file: Upload!) {
        chaseOFXUpload(file: $file) {
            success
            data {
                account {
                    type
                    name
                    routingNumber
                    initialBalance
                    duplicate {
                        type
                        name
                        routingNumber
                        logoUrl
                    }
                }
              transactions {
                transaction {
                    sourceId
                    description
                    amount
                    payeeId
                    payee
                    payeeFull
                    date
                    isoCurrencyCode
                    type
                    checkNumber
                    duplicate {
                        id
                        description
                        amount
                        payeeId
                        payee
                        payeeFull
                        date
                        isoCurrencyCode
                        type
                        checkNumber
                        merchant {
                            id
                            name
                            sourceId
                            logoUrl
                        }
                    }
                }
                merchant {
                    merchantName
                    keyMatch
                    uploadSource
                    sourceId
                }
              }
            }
          }
    }
`);
