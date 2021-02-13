import React from 'react';
import { Navbar, Nav, Button } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import  {Home,Profile} from './pages/';

const App = () => {
  const { isAuthenticated,loginWithRedirect,logout } = useAuth0();

  return  (
      <Router>
      <div>
      <Navbar bg="dark" variant="dark">
        <Nav><Link to="/">Home</Link></Nav>
        <Nav className="ml-auto">
        {
            isAuthenticated
              ? (
                <React.Fragment>                
                <Nav.Link><Link to="/profile">Profile</Link></Nav.Link>                             
                <Button onClick={() => logout()}>Logout</Button>
                </React.Fragment>
              ) : (
                <Button onClick={() => loginWithRedirect()}>Login</Button>
              )
          }
        </Nav>
        <Nav>
          
        </Nav>
      </Navbar>
        <Switch>
          <Route path="/" exact component={Home}>
            
          </Route>
          <Route path="/profile" component={Profile}>
            
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;