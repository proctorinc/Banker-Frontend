/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  routingNumber?: Maybe<Scalars['String']['output']>;
  sourceId: Scalars['String']['output'];
  transactions: TransactionConnection;
  type: Scalars['String']['output'];
  uploadSource: Scalars['String']['output'];
};


export type AccountTransactionsArgs = {
  page?: InputMaybe<PageArgs>;
};

export type AccountConnection = {
  __typename?: 'AccountConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node: Account;
};

export type DateFilter = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type IncomeStats = {
  __typename?: 'IncomeStats';
  total: Scalars['Float']['output'];
  transactions: TransactionConnection;
};


export type IncomeStatsTransactionsArgs = {
  page?: InputMaybe<PageArgs>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Merchant = {
  __typename?: 'Merchant';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  sourceId?: Maybe<Scalars['String']['output']>;
  transactions: TransactionConnection;
};


export type MerchantTransactionsArgs = {
  page?: InputMaybe<PageArgs>;
};

export type MerchantConnection = {
  __typename?: 'MerchantConnection';
  edges: Array<MerchantEdge>;
  pageInfo: PageInfo;
};

export type MerchantEdge = {
  __typename?: 'MerchantEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node: Merchant;
};

export type Mutation = {
  __typename?: 'Mutation';
  chaseOFXUpload: UploadResponse;
  deleteTransaction: Transaction;
  deleteUser: User;
  login?: Maybe<User>;
  logout: Scalars['String']['output'];
  register: User;
};


export type MutationChaseOfxUploadArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type NetStats = {
  __typename?: 'NetStats';
  total: Scalars['Float']['output'];
  transactions: TransactionConnection;
};


export type NetStatsTransactionsArgs = {
  page?: InputMaybe<PageArgs>;
};

export type PageArgs = {
  /** return the records after this token */
  after?: InputMaybe<Scalars['String']['input']>;
  /** first refers to the limit of items to return */
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** endCursor refers to the the first item of the last page */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** hasNextPage informs if there is a next page */
  hasNextPage: Scalars['Boolean']['output'];
  /** hasPreviousPage informs if there is a previous page */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** startCursor refers to the start of the first page */
  startCursor?: Maybe<Scalars['String']['output']>;
  /** totalCount the total number of records */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: AccountConnection;
  income: IncomeStats;
  me?: Maybe<User>;
  merchant?: Maybe<Merchant>;
  merchants: MerchantConnection;
  net: NetStats;
  spending: SpendingStats;
  transaction?: Maybe<Transaction>;
  transactions: TransactionConnection;
  user?: Maybe<User>;
};


export type QueryAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAccountsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type QueryIncomeArgs = {
  input: StatsInput;
};


export type QueryMerchantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMerchantsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type QueryNetArgs = {
  input: StatsInput;
};


export type QuerySpendingArgs = {
  input: StatsInput;
};


export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SpendingStats = {
  __typename?: 'SpendingStats';
  total: Scalars['Float']['output'];
  transactions: TransactionConnection;
};


export type SpendingStatsTransactionsArgs = {
  page?: InputMaybe<PageArgs>;
};

export type Stats = {
  __typename?: 'Stats';
  income?: Maybe<IncomeStats>;
  net?: Maybe<NetStats>;
  spending?: Maybe<SpendingStats>;
};

export type StatsInput = {
  filter: DateFilter;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  checkNumber?: Maybe<Scalars['String']['output']>;
  date: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isoCurrencyCode: Scalars['String']['output'];
  merchant: Merchant;
  payee?: Maybe<Scalars['String']['output']>;
  payeeFull?: Maybe<Scalars['String']['output']>;
  payeeId?: Maybe<Scalars['String']['output']>;
  sourceId: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updated: Scalars['Date']['output'];
  uploadSource: Scalars['String']['output'];
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  edges: Array<TransactionEdge>;
  pageInfo: PageInfo;
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node: Transaction;
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  accounts: UploadStats;
  success: Scalars['Boolean']['output'];
  transactions: UploadStats;
};

export type UploadStats = {
  __typename?: 'UploadStats';
  failed: Scalars['Int']['output'];
  updated: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  accounts: AccountConnection;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  merchants: MerchantConnection;
  role: Scalars['String']['output'];
  transactions: TransactionConnection;
  username: Scalars['String']['output'];
};


export type UserAccountsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type UserMerchantsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type UserTransactionsArgs = {
  page?: InputMaybe<PageArgs>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node: User;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, username: string, email: string } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, role: string, accounts: { __typename?: 'AccountConnection', edges: Array<{ __typename?: 'AccountEdge', cursor?: string | null, node: { __typename?: 'Account', id: string, uploadSource: string, type: string, name: string, routingNumber?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } }, merchants: { __typename?: 'MerchantConnection', edges: Array<{ __typename?: 'MerchantEdge', cursor?: string | null, node: { __typename?: 'Merchant', name: string } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } }, transactions: { __typename?: 'TransactionConnection', edges: Array<{ __typename?: 'TransactionEdge', cursor?: string | null, node: { __typename?: 'Transaction', amount: number, description: string, date: any, merchant: { __typename?: 'Merchant', name: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } } } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uploadSource"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"routingNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;