import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import Login from "./views/Login";
import "./App.css";

const App = () => {
  const routing = useRoutes(Themeroutes);
  
  return <div className="dark">{routing ? routing : <Login />} </div>;
};

export default App;
