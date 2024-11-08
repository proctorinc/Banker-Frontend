import { useMutation } from "@apollo/client";
import { gql } from "../__generated__/gql";

type LoginParams = {
  email: string;
  password: string;
};

export const useLogin = (params: LoginParams) => {
  return useMutation(LOGIN, {
    variables: {
      email: params.email,
      password: params.password,
    },
  });
};

const LOGIN = gql(`
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
