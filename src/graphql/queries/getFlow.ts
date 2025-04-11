import { gql } from "../__generated__";

export const GET_FLOW = gql(`
    query flow(
      $startDate:Date!
      $endDate:Date!
    ) {
      flow(input:{
      	filter:{
      		startDate:$startDate,
          endDate:$endDate
		}
      }) {
        total {
          income
        }
        additionalIncome
        primaryIncome {
          merchant {
            id
            name
            logoUrl
          }
          income
        }
      }
    }
`);
