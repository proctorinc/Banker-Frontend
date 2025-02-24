import { gql } from "../__generated__/gql";

export const UPLOAD_OFX = gql(`
    mutation uploadOFX($file: Upload!) {
        chaseOFXUpload(file: $file) {
            success
            accounts {
                updated
                failed
            }
            transactions {
                updated
                failed
            }
        }
    }
`);
