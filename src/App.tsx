import { useMutation } from "@apollo/client";
import { LOGIN } from "./graphql/queries/Login";

export default function App() {
  const [login, { error, loading, data }] = useMutation(LOGIN, {
    variables: {
      email: "matty@p.com",
      password: "bananarama",
    },
  });

  if (error) {
    return <div>Failed to login</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold underline">
        Baby's first Apollo app 🚀
      </h2>
      <br />
      {!data && !loading && <button onClick={() => login()}>Login</button>}
      {!data && loading && <div>Loading...</div>}
      {data && data.login && <h1>Logged in as: {data && data.login.email}</h1>}
    </div>
  );
}
