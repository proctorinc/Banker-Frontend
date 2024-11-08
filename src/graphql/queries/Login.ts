import { gql } from "../__generated__/gql";

export const LOGIN = gql(`
  mutation Login($email: String!, $password: String!) {
    login(data:{
        email: $email,
        password: $password
    }) {
        id
        username
        email
    }
  }
`);
