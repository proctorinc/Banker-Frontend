import { gql } from "../__generated__";

export const GET_ACTIVE_MONTHS = gql(`
    query getActiveMonths {
        months {
            id
            name
            year
            start
            end
        }
    }
`);
