import { gql } from "../__generated__/gql";

export const CREATE_FUND = gql(`
  mutation createFund($name: String!, $goal: Float!) {
    createFund(data:{
        name:$name
        goal:$goal
    }) {
        id
        name
        goal
        startDate
        endDate
        total
    }
  }
`);
