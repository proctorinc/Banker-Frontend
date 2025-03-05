import { User } from "@/graphql/__generated__/graphql";
import { LOGIN, LOGOUT } from "@/graphql/mutations";
import { GET_ME } from "@/graphql/queries";
import { client } from "@/lib/apollo-client";
import { useMutation } from "@apollo/client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

type LoginParams = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};
type AuthContext = {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
  logout: () => void;
  login: (params: LoginParams) => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [searchParams, _setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginMutation] = useMutation(LOGIN);
  const [logoutMutation] = useMutation(LOGOUT);

  function login(params: LoginParams) {
    loginMutation({
      variables: params,
    }).then(() => loadUser());
  }

  const isAuthenticated = !!currentUser;

  function logout() {
    logoutMutation({
      refetchQueries: [{ query: GET_ME }],
    })
      .then((response) => console.log(response.data?.logout))
      .then(() => {
        setCurrentUser(null);
        goToLoginPage();
      });
  }

  function goToLoginPage() {
    const path = location.pathname;
    if (!path.startsWith("/login")) {
      navigate({
        pathname: "/login",
        search: createSearchParams({
          from: path,
        }).toString(),
      });
    }
  }

  // function goToFromPage() {
  //   const fromURL = searchParams.get("from");
  //   if (fromURL) {
  //     navigate(fromURL);
  //   } else {
  //     navigate("/");
  //   }
  // }

  function loadUser() {
    return client
      .query({ query: GET_ME })
      .then((response) => response.data?.me as User | null)
      .then((user) => setCurrentUser(user));
  }

  useEffect(() => {
    client
      .query({ query: GET_ME })
      .then((response) => response.data?.me as User | null)
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.error(error);
        if (isAuthenticated) {
          console.log("Is authenticated, logging out.");
          logout();
        } else {
          console.log("Isn't authenticated, going to login page");
          goToLoginPage();
        }
      })
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  const contextData = {
    isAuthenticated,
    isLoading,
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
