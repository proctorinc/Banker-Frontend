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
