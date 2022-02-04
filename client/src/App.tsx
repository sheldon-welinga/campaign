import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import { AppProvider } from "./context";
import Routes from "./routes/Routes";
import {
  LoginProps,
  PostProps,
  RegisterProps,
  UserCredentialsProps,
} from "./types";
import { handleFetch, config } from "./utils/axios";

const App: React.FC = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState<string | null>(null);
  const [userCredentials, setUserCredentials] =
    useState<UserCredentialsProps | null>(null);
  const [posts, setPosts] = useState<PostProps[]>([]);

  const sessionToken = sessionStorage.getItem("__token__");
  const sessionUserInfo = sessionStorage.getItem("__userInfo__");

  useEffect(() => {
    if (sessionToken) {
      setToken(JSON.parse(sessionToken));
    }

    if (sessionUserInfo) {
      setUserCredentials(JSON.parse(sessionUserInfo));
    }
  }, [sessionToken, sessionUserInfo]);

  const registerUser = async (user: RegisterProps) => {
    try {
      const res = await handleFetch("/users/register", "post", user);

      if (res) {
        await sessionStorage.setItem(
          "__token__",
          JSON.stringify(res.data.token)
        );
        await sessionStorage.setItem(
          "__userInfo__",
          JSON.stringify(res.data.user)
        );
        enqueueSnackbar(res.message, {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }

      setToken(res.data.token);
      setUserCredentials(res.data.user);
    } catch (err: any) {
      enqueueSnackbar(err.message, {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  const loginUser = async (user: LoginProps) => {
    try {
      const res = await handleFetch("/users/login", "post", user);

      if (res) {
        await sessionStorage.setItem(
          "__token__",
          JSON.stringify(res.data.token)
        );
        await sessionStorage.setItem(
          "__userInfo__",
          JSON.stringify(res.data.user)
        );
        enqueueSnackbar(res.message, {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }

      setToken(res.data.token);
      setUserCredentials(res.data.user);
    } catch (err: any) {
      enqueueSnackbar(err.message, {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  const logOut = () => {
    setUserCredentials(null);
    setToken(null);
    sessionStorage.clear();
  };

  const addPost = async (post: PostProps): Promise<void> => {
    try {
      if (!token) {
        throw Error("Error: invalid user details!");
      }

      const res = await handleFetch("/posts", "post", post, config(token));

      if (res) {
        enqueueSnackbar(res.message, {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
      setPosts([res.data, ...posts]);
    } catch (err: any) {
      enqueueSnackbar(err.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const getPosts = async (): Promise<void> => {
    try {
      if (!token) {
        throw Error("Error: invalid user details!");
      }

      const res = await handleFetch("/posts", "get", {}, config(token));

      if (res.data) {
        setPosts([
          ...res.data.sort(
            (postA: PostProps, postB: PostProps) =>
              new Date(postB.createdAt!).getMilliseconds() -
              new Date(postA.createdAt!).getMilliseconds()
          ),
        ]);
      }
    } catch (err: any) {
      enqueueSnackbar(err.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    try {
      const res = await handleFetch(
        `/posts/${id}`,
        "delete",
        {},
        config(token)
      );

      if (res) {
        enqueueSnackbar(res.message, {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err: any) {
      enqueueSnackbar(err.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <div className="app-wrapper">
      <AppProvider
        value={{
          token,
          userCredentials,
          loginUser,
          registerUser,
          logOut,
          deletePost,
          addPost,
          getPosts,
          posts,
        }}
      >
        <Router>
          <Header />
          <Routes />
        </Router>
      </AppProvider>
    </div>
  );
};

export default App;
