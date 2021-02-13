import React from 'react';
import { Navbar, Nav, Button } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from "./components/UserProfile";

const App = () => {
  const { isAuthenticated,loginWithRedirect,logout } = useAuth0();

  return  (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Auth0</Navbar.Brand>
        <Nav className="ml-auto">
        {
            isAuthenticated
              ? (
                <Button onClick={() => logout()}>Logout</Button>
              ) : (
                <Button onClick={() => loginWithRedirect()}>Login</Button>
              )
          }
        </Nav>        
      </Navbar>
      <UserProfile />
    </div>
  );
}

export default App;