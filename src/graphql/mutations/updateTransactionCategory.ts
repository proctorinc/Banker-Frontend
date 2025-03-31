import { gql } from "../__generated__/gql";

export const UPDATE_TRANSACTION_CATEGORY = gql(`
  mutation updateTransactionCategory($transactionIds: [String!]!, $categoryId: ID!) {
    updateTransactionCategory(input:{
        transactionIds: $transactionIds
        categoryId: $categoryId
    })
  }
`);
