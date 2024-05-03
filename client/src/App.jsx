import "./App.css";
import { Outlet } from "react-router-dom";
import { UserConnectionProvider } from "./Contextes/ConnectionContext";
import { TotalUserProvider } from "./Contextes/TotalUserContext";
import { PopProvider } from "./Contextes/PopContext";
import Head from "./pages/Head";

function App() {
  return (
      <PopProvider>
        <TotalUserProvider>
          <UserConnectionProvider>
            <Head />
            <Outlet />
          </UserConnectionProvider>
        </TotalUserProvider>
      </PopProvider>
  );
}

export default App;