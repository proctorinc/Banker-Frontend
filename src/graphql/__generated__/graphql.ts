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
  balance: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  lastSync: AccountSyncItem;
  name: Scalars['String']['output'];
  routingNumber?: Maybe<Scalars['String']['output']>;
  sourceId: Scalars['String']['output'];
  transactions: TransactionConnection;
  type: Scalars['String']['output'];
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

export type AccountSyncItem = {
  __typename?: 'AccountSyncItem';
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  uploadSource: Scalars['String']['output'];
};

export type CreateFundInput = {
  goal: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type CreateMerchantKey = {
  keyMatch: Scalars['String']['input'];
  uploadSource: Scalars['String']['input'];
};

export type DateFilter = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type Fund = {
  __typename?: 'Fund';
  allocations: FundAllocationConnection;
  endDate: Scalars['Date']['output'];
  goal: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  stats: FundStats;
  total: Scalars['Float']['output'];
};


export type FundAllocationsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type FundStatsArgs = {
  input: StatsInput;
};

export type FundAllocation = {
  __typename?: 'FundAllocation';
  amount: Scalars['Float']['output'];
  date: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  fundId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
};

export type FundAllocationConnection = {
  __typename?: 'FundAllocationConnection';
  edges: Array<FundAllocationEdge>;
  pageInfo: PageInfo;
};

export type FundAllocationEdge = {
  __typename?: 'FundAllocationEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node: FundAllocation;
};

export type FundConnection = {
  __typename?: 'FundConnection';
  edges: Array<FundEdge>;
  pageInfo: PageInfo;
};

export type FundEdge = {
  __typename?: 'FundEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node: Fund;
};

export type FundStats = {
  __typename?: 'FundStats';
  net: Scalars['Float']['output'];
  saved: Scalars['Float']['output'];
  spent: Scalars['Float']['output'];
};

export type FundsResponse = {
  __typename?: 'FundsResponse';
  funds: FundConnection;
  savingsHistory: Array<SavingsHistory>;
  stats: FundsStats;
  totalSavings: Scalars['Float']['output'];
  unallocated: Scalars['Float']['output'];
};


export type FundsResponseFundsArgs = {
  page?: InputMaybe<PageArgs>;
};

export type FundsStats = {
  __typename?: 'FundsStats';
  net: Scalars['Float']['output'];
  saved: Scalars['Float']['output'];
  spent: Scalars['Float']['output'];
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
  keys: Array<MerchantKey>;
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

export type MerchantKey = {
  __typename?: 'MerchantKey';
  id: Scalars['ID']['output'];
  keyMatch: Scalars['String']['output'];
  uploadSource: Scalars['String']['output'];
};

export type MergeMerchantsInput = {
  keyMatches: Array<CreateMerchantKey>;
  merchantIds: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MonthItem = {
  __typename?: 'MonthItem';
  end: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  start: Scalars['Date']['output'];
  year: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  chaseOFXUpload: UploadResponse;
  createFund: Fund;
  deleteTransaction: Transaction;
  deleteUser: User;
  login?: Maybe<User>;
  logout: Scalars['String']['output'];
  mergeMerchants: Merchant;
  register: User;
};


export type MutationChaseOfxUploadArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationCreateFundArgs = {
  data: CreateFundInput;
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationMergeMerchantsArgs = {
  input: MergeMerchantsInput;
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
  fund?: Maybe<Fund>;
  income: IncomeStats;
  me?: Maybe<User>;
  merchant?: Maybe<Merchant>;
  merchantKeys: Array<MerchantKey>;
  merchants: MerchantConnection;
  months: Array<MonthItem>;
  net: NetStats;
  savingsFunds: FundsResponse;
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


export type QueryFundArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIncomeArgs = {
  input: StatsInput;
};


export type QueryMerchantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMerchantKeysArgs = {
  merchantIds: Array<Scalars['String']['input']>;
};


export type QueryMerchantsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type QueryNetArgs = {
  input: StatsInput;
};


export type QuerySavingsFundsArgs = {
  filter: DateFilter;
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

export type SavingsHistory = {
  __typename?: 'SavingsHistory';
  month: Scalars['String']['output'];
  net: Scalars['Float']['output'];
  saved: Scalars['Float']['output'];
  spent: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
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
  category?: Maybe<TransactionCategory>;
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
};

export type TransactionCategory = {
  __typename?: 'TransactionCategory';
  color: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isTransfer: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
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
  savingsFunds: FundConnection;
  transactions: TransactionConnection;
  username: Scalars['String']['output'];
};


export type UserAccountsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type UserMerchantsArgs = {
  page?: InputMaybe<PageArgs>;
};


export type UserSavingsFundsArgs = {
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

export type CreateFundMutationVariables = Exact<{
  name: Scalars['String']['input'];
  goal: Scalars['Float']['input'];
}>;


export type CreateFundMutation = { __typename?: 'Mutation', createFund: { __typename?: 'Fund', id: string, name: string, goal: number, startDate: any, endDate: any, total: number } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, username: string, email: string } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type MergeMerchantsMutationVariables = Exact<{
  name: Scalars['String']['input'];
  merchantIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  keyMatches: Array<CreateMerchantKey> | CreateMerchantKey;
}>;


export type MergeMerchantsMutation = { __typename?: 'Mutation', mergeMerchants: { __typename?: 'Merchant', id: string, name: string, sourceId?: string | null } };

export type UploadOfxMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadOfxMutation = { __typename?: 'Mutation', chaseOFXUpload: { __typename?: 'UploadResponse', success: boolean, accounts: { __typename?: 'UploadStats', updated: number, failed: number }, transactions: { __typename?: 'UploadStats', updated: number, failed: number } } };

export type GetAccountQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', id: string, sourceId: string, type: string, name: string, routingNumber?: string | null, lastSync: { __typename?: 'AccountSyncItem', date: any, uploadSource: string }, transactions: { __typename?: 'TransactionConnection', edges: Array<{ __typename?: 'TransactionEdge', cursor?: string | null, node: { __typename?: 'Transaction', description: string, amount: number, date: any, merchant: { __typename?: 'Merchant', name: string, sourceId?: string | null } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null, totalCount?: number | null } } } | null };

export type GetActiveMonthsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveMonthsQuery = { __typename?: 'Query', months: Array<{ __typename?: 'MonthItem', id: string, name: string, year: string, start: any, end: any }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, role: string, accounts: { __typename?: 'AccountConnection', edges: Array<{ __typename?: 'AccountEdge', cursor?: string | null, node: { __typename?: 'Account', id: string, type: string, name: string, routingNumber?: string | null, lastSync: { __typename?: 'AccountSyncItem', date: any, uploadSource: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } }, merchants: { __typename?: 'MerchantConnection', edges: Array<{ __typename?: 'MerchantEdge', cursor?: string | null, node: { __typename?: 'Merchant', name: string } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } }, transactions: { __typename?: 'TransactionConnection', edges: Array<{ __typename?: 'TransactionEdge', cursor?: string | null, node: { __typename?: 'Transaction', amount: number, description: string, date: any, merchant: { __typename?: 'Merchant', name: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } } } | null };

export type GetMerchantQueryVariables = Exact<{
  merchantId: Scalars['ID']['input'];
}>;


export type GetMerchantQuery = { __typename?: 'Query', merchant?: { __typename?: 'Merchant', id: string, name: string, ownerId: string, sourceId?: string | null, keys: Array<{ __typename?: 'MerchantKey', id: string, keyMatch: string, uploadSource: string }>, transactions: { __typename?: 'TransactionConnection', edges: Array<{ __typename?: 'TransactionEdge', cursor?: string | null, node: { __typename?: 'Transaction', id: string, description: string, amount: number, payee?: string | null, date: any, merchant: { __typename?: 'Merchant', name: string, sourceId?: string | null } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null, totalCount?: number | null } } } | null };

export type MerchantKeysQueryVariables = Exact<{
  merchantIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type MerchantKeysQuery = { __typename?: 'Query', merchantKeys: Array<{ __typename?: 'MerchantKey', id: string, keyMatch: string, uploadSource: string }> };

export type GetMerchantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMerchantsQuery = { __typename?: 'Query', merchants: { __typename?: 'MerchantConnection', edges: Array<{ __typename?: 'MerchantEdge', cursor?: string | null, node: { __typename?: 'Merchant', id: string, name: string, sourceId?: string | null, ownerId: string, keys: Array<{ __typename?: 'MerchantKey', id: string, keyMatch: string, uploadSource: string }>, transactions: { __typename?: 'TransactionConnection', pageInfo: { __typename?: 'PageInfo', totalCount?: number | null } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } } };

export type GetSavingsFundsQueryVariables = Exact<{
  startDate: Scalars['Date']['input'];
  endDate: Scalars['Date']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSavingsFundsQuery = { __typename?: 'Query', savingsFunds: { __typename?: 'FundsResponse', totalSavings: number, unallocated: number, savingsHistory: Array<{ __typename?: 'SavingsHistory', month: string, year: number, saved: number, spent: number, net: number }>, stats: { __typename?: 'FundsStats', saved: number, spent: number, net: number }, funds: { __typename?: 'FundConnection', edges: Array<{ __typename?: 'FundEdge', cursor?: string | null, node: { __typename?: 'Fund', id: string, name: string, goal: number, total: number, startDate: any, endDate: any, stats: { __typename?: 'FundStats', saved: number, spent: number, net: number }, allocations: { __typename?: 'FundAllocationConnection', edges: Array<{ __typename?: 'FundAllocationEdge', node: { __typename?: 'FundAllocation', id: string, description: string, amount: number, date: any } }> } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null, totalCount?: number | null } } } };

export type GetStatsQueryVariables = Exact<{
  startDate: Scalars['Date']['input'];
  endDate: Scalars['Date']['input'];
}>;


export type GetStatsQuery = { __typename?: 'Query', savingsFunds: { __typename?: 'FundsResponse', totalSavings: number, unallocated: number, stats: { __typename?: 'FundsStats', saved: number, spent: number, net: number } }, spending: { __typename?: 'SpendingStats', total: number, transactions: { __typename?: 'TransactionConnection', edges: Array<{ __typename?: 'TransactionEdge', cursor?: string | null, node: { __typename?: 'Transaction', id: string, description: string, amount: number, payee?: string | null, date: any, merchant: { __typename?: 'Merchant', name: string, sourceId?: string | null } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } } }, income: { __typename?: 'IncomeStats', total: number, transactions: { __typename?: 'TransactionConnection', edges: Array<{ __typename?: 'TransactionEdge', cursor?: string | null, node: { __typename?: 'Transaction', id: string, description: string, amount: number, payee?: string | null, date: any, merchant: { __typename?: 'Merchant', name: string, sourceId?: string | null } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalCount?: number | null } } }, net: { __typename?: 'NetStats', total: number } };

export type GetTransactionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', transactions: { __typename?: 'TransactionConnection', edges: Array<{ __typename?: 'TransactionEdge', cursor?: string | null, node: { __typename?: 'Transaction', id: string, description: string, amount: number, payee?: string | null, date: any, category?: { __typename?: 'TransactionCategory', name: string, color: string, icon: string } | null, merchant: { __typename?: 'Merchant', name: string, sourceId?: string | null } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null, totalCount?: number | null } } };


export const CreateFundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createFund"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"goal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFund"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"goal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"goal"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"goal"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<CreateFundMutation, CreateFundMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const MergeMerchantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"mergeMerchants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"merchantIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyMatches"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMerchantKey"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mergeMerchants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"merchantIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"merchantIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"keyMatches"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyMatches"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}}]}}]}}]} as unknown as DocumentNode<MergeMerchantsMutation, MergeMerchantsMutationVariables>;
export const UploadOfxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadOFX"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chaseOFXUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}}]}}]}}]}}]} as unknown as DocumentNode<UploadOfxMutation, UploadOfxMutationVariables>;
export const GetAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"routingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastSync"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"uploadSource"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountQuery, GetAccountQueryVariables>;
export const GetActiveMonthsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActiveMonths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"months"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}}]}}]} as unknown as DocumentNode<GetActiveMonthsQuery, GetActiveMonthsQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"routingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastSync"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"uploadSource"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetMerchantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMerchant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"merchantId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merchant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"merchantId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"keys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keyMatch"}},{"kind":"Field","name":{"kind":"Name","value":"uploadSource"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMerchantQuery, GetMerchantQueryVariables>;
export const MerchantKeysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"merchantKeys"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"merchantIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merchantKeys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"merchantIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"merchantIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keyMatch"}},{"kind":"Field","name":{"kind":"Name","value":"uploadSource"}}]}}]}}]} as unknown as DocumentNode<MerchantKeysQuery, MerchantKeysQueryVariables>;
export const GetMerchantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMerchants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merchants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"keys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keyMatch"}},{"kind":"Field","name":{"kind":"Name","value":"uploadSource"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetMerchantsQuery, GetMerchantsQueryVariables>;
export const GetSavingsFundsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSavingsFunds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savingsFunds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSavings"}},{"kind":"Field","name":{"kind":"Name","value":"unallocated"}},{"kind":"Field","name":{"kind":"Name","value":"savingsHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"saved"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"net"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saved"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"net"}}]}},{"kind":"Field","name":{"kind":"Name","value":"funds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"goal"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saved"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"net"}}]}},{"kind":"Field","name":{"kind":"Name","value":"allocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSavingsFundsQuery, GetSavingsFundsQueryVariables>;
export const GetStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savingsFunds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSavings"}},{"kind":"Field","name":{"kind":"Name","value":"unallocated"}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saved"}},{"kind":"Field","name":{"kind":"Name","value":"spent"}},{"kind":"Field","name":{"kind":"Name","value":"net"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"spending"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"income"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"net"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetStatsQuery, GetStatsQueryVariables>;
export const GetTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetTransactionsQuery, GetTransactionsQueryVariables>;