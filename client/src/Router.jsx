import { createBrowserRouter } from "react-router-dom";

import App from "./App";
// eslint-disable-next-line import/no-named-as-default
import Home from "./pages/Home";
import Recto from "./pages/Recto";
import Verso from "./pages/Verso";
import Test from "./pages/Test";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser.jsx";
import MonCompte from "./pages/MonCompte.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/recto",
        element: <Recto />,
      },
      {
        path: "/verso",
        element: <Verso />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/new-user",
        element: <NewUser />,
      },
      {
        path: "/mon-compte",
        element: <MonCompte />,
      },
    ],
  },
]);

export default router;
