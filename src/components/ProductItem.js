import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const [profileState, setProfileState] = useState(props);

  useEffect(() => {
    setProfileState(props);
  }, [props]);

  const { isAuthenticated } = useAuth0();

  return (
    <Card className="my-2">
      <Link to={`/detail/${profileState.data.id}`}>
        <Row className="align-items-center profile-header m-2 text-center text-md-left">
          <Col md={2}>
            <img
              src={profileState.data.photo}
              alt="Profile"
              className="img-fluid mb-3 mb-md-0"
            />
          </Col>
          <Col md>
            <h2>{profileState.data.name}</h2>
            <p className="lead text-muted danger">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(profileState.data.price)}
            </p>
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default ProductItem;
