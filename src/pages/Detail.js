import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const Detail = (props) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const { isAuthenticated } = useAuth0();

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

  if (isLoading) {
    return <div>loading...</div>;
  }

  const deleteItem = async () => {
    const result = await axios.delete(
      `https://berkkarslan-json-server.herokuapp.com/products/${id}`
    );
    if (result.status === 200) {
      history.push("/");
    }
  };

  return (
    <div className="py-5">
      <Row>
        <Col md={6} className="d-flex justify-content-center ">
          <img className="img-fluid" src={itemDetails.photo} alt="product" />
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
          {isAuthenticated ? (
            <div className="my-3">
              <Link
                className="btn btn-warning"
                to={{
                  pathname: `/edit/${itemDetails.id}`,
                  myCustomProps: itemDetails,
                }}
              >
                Update Product
              </Link>
              <Button onClick={deleteItem} variant="danger" className="ml-4">
                Delete Product
              </Button>
            </div>
          ) : undefined}
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
