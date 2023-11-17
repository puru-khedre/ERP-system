import React, { createContext, lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import RegistrationForm from "./Create";
import Edit from "./Edit";
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

export const context = createContext(null);

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <context.Provider value={{ isAdmin, setIsAdmin }}>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin/login" component={() => <Login type="admin" />} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/create" component={RegistrationForm} />
          <Route path="/Edit" component={Edit} />
          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </context.Provider>
  );
}

export default App;
