import "./App.css";
import { Outlet } from "react-router-dom";
import { UserConnectionProvider } from "./Contextes/ConnectionContext";
import Head from "./pages/Head";

function App() {
  return (
    <UserConnectionProvider>
      <Head />
      <Outlet />
    </UserConnectionProvider>
  );
}

export default App;
