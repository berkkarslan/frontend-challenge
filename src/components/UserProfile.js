import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Card } from "react-bootstrap"

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Container>
        <Card style={{ width: '14rem' }}>
          <Card.Img variant="top" src={user.picture} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              {user.email}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    )
  );
};

export default UserProfile;