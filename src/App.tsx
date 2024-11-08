import { useState } from "react";
import { useLogin } from "./graphql/mutations";
import { useMe } from "./graphql/queries";

export default function App() {
  const [email, setEmail] = useState("matty@p.com");
  const [password, setPassword] = useState("bananarama");
  const [login, { error, loading, data }] = useLogin({
    email,
    password,
  });
  const userQuery = useMe();

  console.log(userQuery.data);

  return (
    <div>
      <h2 className="text-3xl font-bold underline">
        Baby's first Apollo app 🚀
      </h2>
      <br />
      {error && <div>{error.message}</div>}
      {!data && !loading && (
        <form onSubmit={() => login()} className="flex flex-col gap-3 w-64">
          <input
            className="bg-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-gray-100"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
      {!data && loading && <div>Loading...</div>}
      {data && data.login && (
        <>
          <h1>Logged in as: {data && data.login.username}</h1>
          {userQuery.data && (
            <div>
              {userQuery?.data?.me?.accounts.edges.map(({ node: account }) => {
                return (
                  <div>
                    {account.name} : {account.type}
                    {account?.routingNumber
                      ? ` - ${account.routingNumber}`
                      : ""}
                  </div>
                );
              })}
              <div>
                Transactions:{" "}
                {userQuery?.data?.me &&
                  userQuery.data.me.transactions.pageInfo.totalCount}
              </div>
              {userQuery?.data?.me?.transactions.edges.map(
                ({ node: transaction }) => {
                  return (
                    <div>
                      {transaction.description} : {transaction.merchant.name} -{" "}
                      {new Date(transaction.date).toLocaleString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  );
                },
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
