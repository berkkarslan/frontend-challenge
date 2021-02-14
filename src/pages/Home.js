import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

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
      {products.map((item) => {
        return <ProductItem key={item.id} data={item} />;
      })}
    </Container>
  );
};

export default Home;
