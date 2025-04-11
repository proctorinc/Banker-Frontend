import { gql } from "../__generated__/gql";

export const LINK_MERCHANT_TO_TRANSACTION_CATEGORY = gql(`
    mutation linkMerchantToTransactionCategory($merchantId: ID!, $categoryId: ID) {
        linkMerchantToTransactionCategory(input:{
            merchantId: $merchantId
            categoryId: $categoryId
        })
    }
`);
