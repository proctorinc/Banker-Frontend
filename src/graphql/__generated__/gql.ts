/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(data:{\n        email: $email,\n        password: $password\n    }) {\n        id\n        username\n        email\n    }\n  }\n": types.LoginDocument,
    "\n    query getMe {\n      me {\n        id\n        username\n        email\n        role\n        accounts(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              id\n              uploadSource\n              type\n              name\n              routingNumber\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        merchants(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              name\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        transactions(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              amount\n              description\n              date\n              merchant {\n                name\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n      }\n    }\n": types.GetMeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(data:{\n        email: $email,\n        password: $password\n    }) {\n        id\n        username\n        email\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(data:{\n        email: $email,\n        password: $password\n    }) {\n        id\n        username\n        email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getMe {\n      me {\n        id\n        username\n        email\n        role\n        accounts(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              id\n              uploadSource\n              type\n              name\n              routingNumber\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        merchants(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              name\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        transactions(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              amount\n              description\n              date\n              merchant {\n                name\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    query getMe {\n      me {\n        id\n        username\n        email\n        role\n        accounts(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              id\n              uploadSource\n              type\n              name\n              routingNumber\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        merchants(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              name\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        transactions(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              amount\n              description\n              date\n              merchant {\n                name\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n      }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;