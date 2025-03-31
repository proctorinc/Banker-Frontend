import { gql } from "../__generated__/gql";

export const GET_TRANSACTION_CATEGORIES = gql(`
  query getTransactionCategories {
    transactionCategories {
        id
        name
        color
        icon
    }
  }
`);
