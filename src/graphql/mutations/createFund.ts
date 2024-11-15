import { gql } from "../__generated__/gql";

export const CREATE_FUND = gql(`
  mutation createFund($type: String!, $name: String!, $goal: Float!) {
    createFund(data:{
        type:$type
        name:$name
        goal:$goal
    }) {
        id
        type
        name
        goal
        startDate
        endDate
        total
    }
  }
`);
