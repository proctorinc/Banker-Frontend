import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";

export const useMe = () => {
  return useQuery(GET_ME);
};

const GET_ME = gql(`
    query getMe {
      me {
        id
        username
        email
        role
        accounts(page:{
          first: 5
        }) {
          edges {
            node {
              id
              uploadSource
              type
              name
              routingNumber
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            totalCount
          }
        }
        merchants(page:{
          first: 5
        }) {
          edges {
            node {
              name
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            totalCount
          }
        }
        transactions(page:{
          first: 10
        }) {
          edges {
            node {
              amount
              description
              date
              merchant {
                name
              }
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            totalCount
          }
        }
      }
    }
`);
