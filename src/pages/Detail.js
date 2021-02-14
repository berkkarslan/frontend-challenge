import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Detail = (props) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    //setItemDetails(props);
    async function fetchData() {
      const result = await axios(
        `https://berkkarslan-json-server.herokuapp.com/products/${id}`
      );
      setItemDetails(result.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const { isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="py-5">
      <Row>
        <Col md={6} className="d-flex justify-content-center ">
          <img
            className="product-detail-image"
            src={itemDetails.photo}
            alt="Profile"
          />
        </Col>
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h1 className="display-4">{itemDetails.name}</h1>
          <p className="h3">
            {new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(itemDetails.price)}
          </p>
          <div className="my-3">
            <Button variant="warning">Update Product</Button>
            <Button variant="danger" className="ml-4">
              Delete Product
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
