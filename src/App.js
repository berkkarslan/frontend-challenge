import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, Profile, Detail, Edit, Create } from "./pages/";
import "./App.css";

const App = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Nav>
            <Link className="text-white" to="/">
              Home
            </Link>
          </Nav>
          <Nav className="ml-auto">
            {isAuthenticated ? (
              <React.Fragment>
                <Nav.Link className="text-white">
                  <Link className="text-white" to="/profile">
                    Profile
                  </Link>
                </Nav.Link>
                <Button onClick={() => logout()}>Logout</Button>
              </React.Fragment>
            ) : (
              <Button onClick={() => loginWithRedirect()}>Login</Button>
            )}
          </Nav>
          <Nav></Nav>
        </Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/create" component={Create} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
