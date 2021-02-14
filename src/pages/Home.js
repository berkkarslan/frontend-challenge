import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://berkkarslan-json-server.herokuapp.com/products"
      );
      setProducts(result.data);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <div className="my-2">
        <h2>Our Products</h2>
      </div>
      {isAuthenticated ? (
        <Link to="/create">Create New Product</Link>
      ) : undefined}

      {products.map((item) => {
        return <ProductItem key={item.id} data={item} />;
      })}
    </Container>
  );
};

export default Home;
