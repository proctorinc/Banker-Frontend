import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/features/auth/hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("matty@p.com");
  const [password, setPassword] = useState("bananarama");
  const { login, isAuthenticated } = useAuth();

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login({ password, email });
  }

  return (
    <div>
      <h2 className="text-3xl font-bold underline">
        Baby's first Apollo app 🚀
      </h2>
      {isAuthenticated ? "Authenticated" : "Not Authenticated"}
      <form onSubmit={submitForm} className="flex flex-col gap-3 w-64">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
      {/* {error && <div>{error.message}</div>}
      {!data && !loading && (

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
      )} */}
    </div>
  );
};

export default Login;
