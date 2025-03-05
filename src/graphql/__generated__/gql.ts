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
    "\n  mutation createFund($type: String!, $name: String!, $goal: Float!) {\n    createFund(data:{\n        type:$type\n        name:$name\n        goal:$goal\n    }) {\n        id\n        type\n        name\n        goal\n        startDate\n        endDate\n        total\n    }\n  }\n": types.CreateFundDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(data:{\n        email: $email,\n        password: $password\n    }) {\n        id\n        username\n        email\n    }\n  }\n": types.LoginDocument,
    "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n    mutation uploadOFX($file: Upload!) {\n        chaseOFXUpload(file: $file) {\n            success\n            accounts {\n                updated\n                failed\n            }\n            transactions {\n                updated\n                failed\n            }\n        }\n    }\n": types.UploadOfxDocument,
    "\n    query getAccount($id: ID!, $first: Int!, $after: String) {\n      account(id: $id) {\n        id\n        sourceId\n        type\n        name\n        routingNumber\n        lastSync {\n            date\n            uploadSource\n        }\n        transactions(page: {\n          first: $first\n          after: $after\n        }) {\n          edges {\n            node {\n              description\n              amount\n              date\n              merchant {\n                name\n                sourceId\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            endCursor\n            startCursor\n            totalCount\n          }\n        }\n      }\n    }\n": types.GetAccountDocument,
    "\n    query getActiveMonths {\n        months {\n            id\n            name\n            year\n            start\n            end\n        }\n    }\n": types.GetActiveMonthsDocument,
    "\n    query getBudgets($first: Int!, $after: String) {\n      budgets(page: {\n        first: $first\n        after: $after\n      }) {\n        edges {\n          node {\n            id\n            name\n            type\n            goal\n            total\n            startDate\n            endDate\n            allocations(page:{\n                first:50\n            }) {\n                edges {\n                    node {\n                        description\n                        amount\n                    }\n                }\n                pageInfo {\n                hasNextPage\n                hasPreviousPage\n                endCursor\n                startCursor\n                totalCount\n                }\n            }\n          }\n          cursor\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n          totalCount\n        }\n      }\n    }\n": types.GetBudgetsDocument,
    "\n    query getMe {\n      me {\n        id\n        username\n        email\n        role\n        accounts(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              id\n              type\n              name\n              routingNumber\n              lastSync {\n                  date\n                  uploadSource\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        merchants(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              name\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        transactions(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              amount\n              description\n              date\n              merchant {\n                name\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n      }\n    }\n": types.GetMeDocument,
    "\n    query getSavingsFunds($startDate: Date!, $endDate: Date!, $first: Int!, $after: String) {\n      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {\n        totalSavings\n        unallocated\n        savingsHistory {\n            month\n            year\n            saved\n            spent\n            net\n        }\n        stats {\n          saved\n          spent\n          net\n        }\n        funds(page: {first: $first, after: $after}) {\n          edges {\n            node {\n              id\n              name\n              type\n              goal\n              total\n              startDate\n              endDate\n              stats(input: {\n                  filter: {\n                    startDate: $startDate\n                    endDate: $endDate\n                  }\n              }) {\n                  saved\n                  spent\n                  net\n              }\n              allocations(page: {first: 10}) {\n                edges {\n                    node {\n                        id\n                        description\n                        amount\n                        date\n                    }\n                }\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            endCursor\n            startCursor\n            totalCount\n          }\n        }\n      }\n    }\n": types.GetSavingsFundsDocument,
    "\n  query getStats($startDate: Date!, $endDate: Date!) {\n      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {\n        totalSavings\n        unallocated\n        stats {\n          saved\n          spent\n          net\n        }\n      }\n    spending(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n        transactions(page: {\n            first: 5\n        }) {\n            edges {\n                node {\n                  id\n                  description\n                  amount\n                  payee\n                  date\n                  merchant {\n                    name\n                    sourceId\n                  }\n                }\n                cursor\n            }\n            pageInfo {\n                hasNextPage\n                hasPreviousPage\n                totalCount\n            }\n        }\n    }\n    income(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n        transactions(page: {\n            first: 5\n        }) {\n            edges {\n                node {\n                  id\n                  description\n                  amount\n                  payee\n                  date\n                  merchant {\n                    name\n                    sourceId\n                  }\n                }\n                cursor\n            }\n            pageInfo {\n                hasNextPage\n                hasPreviousPage\n                totalCount\n            }\n        }\n    }\n    net(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n    }\n  }\n": types.GetStatsDocument,
    "\n    query getTransactions($first: Int!, $after: String) {\n      transactions(page: {\n        first: $first\n        after: $after\n      }) {\n        edges {\n          node {\n            id\n            description\n            amount\n            payee\n            date\n            merchant {\n              name\n              sourceId\n            }\n          }\n          cursor\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n          totalCount\n        }\n      }\n    }\n": types.GetTransactionsDocument,
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
export function gql(source: "\n  mutation createFund($type: String!, $name: String!, $goal: Float!) {\n    createFund(data:{\n        type:$type\n        name:$name\n        goal:$goal\n    }) {\n        id\n        type\n        name\n        goal\n        startDate\n        endDate\n        total\n    }\n  }\n"): (typeof documents)["\n  mutation createFund($type: String!, $name: String!, $goal: Float!) {\n    createFund(data:{\n        type:$type\n        name:$name\n        goal:$goal\n    }) {\n        id\n        type\n        name\n        goal\n        startDate\n        endDate\n        total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(data:{\n        email: $email,\n        password: $password\n    }) {\n        id\n        username\n        email\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(data:{\n        email: $email,\n        password: $password\n    }) {\n        id\n        username\n        email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation uploadOFX($file: Upload!) {\n        chaseOFXUpload(file: $file) {\n            success\n            accounts {\n                updated\n                failed\n            }\n            transactions {\n                updated\n                failed\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation uploadOFX($file: Upload!) {\n        chaseOFXUpload(file: $file) {\n            success\n            accounts {\n                updated\n                failed\n            }\n            transactions {\n                updated\n                failed\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getAccount($id: ID!, $first: Int!, $after: String) {\n      account(id: $id) {\n        id\n        sourceId\n        type\n        name\n        routingNumber\n        lastSync {\n            date\n            uploadSource\n        }\n        transactions(page: {\n          first: $first\n          after: $after\n        }) {\n          edges {\n            node {\n              description\n              amount\n              date\n              merchant {\n                name\n                sourceId\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            endCursor\n            startCursor\n            totalCount\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    query getAccount($id: ID!, $first: Int!, $after: String) {\n      account(id: $id) {\n        id\n        sourceId\n        type\n        name\n        routingNumber\n        lastSync {\n            date\n            uploadSource\n        }\n        transactions(page: {\n          first: $first\n          after: $after\n        }) {\n          edges {\n            node {\n              description\n              amount\n              date\n              merchant {\n                name\n                sourceId\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            endCursor\n            startCursor\n            totalCount\n          }\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getActiveMonths {\n        months {\n            id\n            name\n            year\n            start\n            end\n        }\n    }\n"): (typeof documents)["\n    query getActiveMonths {\n        months {\n            id\n            name\n            year\n            start\n            end\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getBudgets($first: Int!, $after: String) {\n      budgets(page: {\n        first: $first\n        after: $after\n      }) {\n        edges {\n          node {\n            id\n            name\n            type\n            goal\n            total\n            startDate\n            endDate\n            allocations(page:{\n                first:50\n            }) {\n                edges {\n                    node {\n                        description\n                        amount\n                    }\n                }\n                pageInfo {\n                hasNextPage\n                hasPreviousPage\n                endCursor\n                startCursor\n                totalCount\n                }\n            }\n          }\n          cursor\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n          totalCount\n        }\n      }\n    }\n"): (typeof documents)["\n    query getBudgets($first: Int!, $after: String) {\n      budgets(page: {\n        first: $first\n        after: $after\n      }) {\n        edges {\n          node {\n            id\n            name\n            type\n            goal\n            total\n            startDate\n            endDate\n            allocations(page:{\n                first:50\n            }) {\n                edges {\n                    node {\n                        description\n                        amount\n                    }\n                }\n                pageInfo {\n                hasNextPage\n                hasPreviousPage\n                endCursor\n                startCursor\n                totalCount\n                }\n            }\n          }\n          cursor\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n          totalCount\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getMe {\n      me {\n        id\n        username\n        email\n        role\n        accounts(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              id\n              type\n              name\n              routingNumber\n              lastSync {\n                  date\n                  uploadSource\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        merchants(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              name\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        transactions(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              amount\n              description\n              date\n              merchant {\n                name\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    query getMe {\n      me {\n        id\n        username\n        email\n        role\n        accounts(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              id\n              type\n              name\n              routingNumber\n              lastSync {\n                  date\n                  uploadSource\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        merchants(page:{\n          first: 5\n        }) {\n          edges {\n            node {\n              name\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n        transactions(page:{\n          first: 10\n        }) {\n          edges {\n            node {\n              amount\n              description\n              date\n              merchant {\n                name\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            totalCount\n          }\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getSavingsFunds($startDate: Date!, $endDate: Date!, $first: Int!, $after: String) {\n      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {\n        totalSavings\n        unallocated\n        savingsHistory {\n            month\n            year\n            saved\n            spent\n            net\n        }\n        stats {\n          saved\n          spent\n          net\n        }\n        funds(page: {first: $first, after: $after}) {\n          edges {\n            node {\n              id\n              name\n              type\n              goal\n              total\n              startDate\n              endDate\n              stats(input: {\n                  filter: {\n                    startDate: $startDate\n                    endDate: $endDate\n                  }\n              }) {\n                  saved\n                  spent\n                  net\n              }\n              allocations(page: {first: 10}) {\n                edges {\n                    node {\n                        id\n                        description\n                        amount\n                        date\n                    }\n                }\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            endCursor\n            startCursor\n            totalCount\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    query getSavingsFunds($startDate: Date!, $endDate: Date!, $first: Int!, $after: String) {\n      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {\n        totalSavings\n        unallocated\n        savingsHistory {\n            month\n            year\n            saved\n            spent\n            net\n        }\n        stats {\n          saved\n          spent\n          net\n        }\n        funds(page: {first: $first, after: $after}) {\n          edges {\n            node {\n              id\n              name\n              type\n              goal\n              total\n              startDate\n              endDate\n              stats(input: {\n                  filter: {\n                    startDate: $startDate\n                    endDate: $endDate\n                  }\n              }) {\n                  saved\n                  spent\n                  net\n              }\n              allocations(page: {first: 10}) {\n                edges {\n                    node {\n                        id\n                        description\n                        amount\n                        date\n                    }\n                }\n              }\n            }\n            cursor\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            endCursor\n            startCursor\n            totalCount\n          }\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getStats($startDate: Date!, $endDate: Date!) {\n      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {\n        totalSavings\n        unallocated\n        stats {\n          saved\n          spent\n          net\n        }\n      }\n    spending(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n        transactions(page: {\n            first: 5\n        }) {\n            edges {\n                node {\n                  id\n                  description\n                  amount\n                  payee\n                  date\n                  merchant {\n                    name\n                    sourceId\n                  }\n                }\n                cursor\n            }\n            pageInfo {\n                hasNextPage\n                hasPreviousPage\n                totalCount\n            }\n        }\n    }\n    income(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n        transactions(page: {\n            first: 5\n        }) {\n            edges {\n                node {\n                  id\n                  description\n                  amount\n                  payee\n                  date\n                  merchant {\n                    name\n                    sourceId\n                  }\n                }\n                cursor\n            }\n            pageInfo {\n                hasNextPage\n                hasPreviousPage\n                totalCount\n            }\n        }\n    }\n    net(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n    }\n  }\n"): (typeof documents)["\n  query getStats($startDate: Date!, $endDate: Date!) {\n      savingsFunds(filter: {startDate: $startDate, endDate: $endDate}) {\n        totalSavings\n        unallocated\n        stats {\n          saved\n          spent\n          net\n        }\n      }\n    spending(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n        transactions(page: {\n            first: 5\n        }) {\n            edges {\n                node {\n                  id\n                  description\n                  amount\n                  payee\n                  date\n                  merchant {\n                    name\n                    sourceId\n                  }\n                }\n                cursor\n            }\n            pageInfo {\n                hasNextPage\n                hasPreviousPage\n                totalCount\n            }\n        }\n    }\n    income(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n        transactions(page: {\n            first: 5\n        }) {\n            edges {\n                node {\n                  id\n                  description\n                  amount\n                  payee\n                  date\n                  merchant {\n                    name\n                    sourceId\n                  }\n                }\n                cursor\n            }\n            pageInfo {\n                hasNextPage\n                hasPreviousPage\n                totalCount\n            }\n        }\n    }\n    net(\n        input: {\n            filter: {\n                startDate: $startDate\n                endDate: $endDate\n            }\n        }\n    ) {\n        total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getTransactions($first: Int!, $after: String) {\n      transactions(page: {\n        first: $first\n        after: $after\n      }) {\n        edges {\n          node {\n            id\n            description\n            amount\n            payee\n            date\n            merchant {\n              name\n              sourceId\n            }\n          }\n          cursor\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n          totalCount\n        }\n      }\n    }\n"): (typeof documents)["\n    query getTransactions($first: Int!, $after: String) {\n      transactions(page: {\n        first: $first\n        after: $after\n      }) {\n        edges {\n          node {\n            id\n            description\n            amount\n            payee\n            date\n            merchant {\n              name\n              sourceId\n            }\n          }\n          cursor\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n          totalCount\n        }\n      }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;