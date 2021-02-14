import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [validated, setValidated] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formdata = new FormData(event.target);
    const json = { lastupdated: Date.now() };
    formdata.forEach(function (value, prop) {
      json[prop] = value;
    });
    setValidated(true);
    if (form.checkValidity()) {
      //event.stopPropagation();
      const result = await axios.post(
        "https://berkkarslan-json-server.herokuapp.com/products",
        json
      );
      if (result.status === 201) {
        history.push("/");
      }
    }
  };

  return (
    <Container>
      <Form
        className="col-md-8 m-auto py-4"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="d-flex flex-column justify-content-center align-items-center">
          <span className="my-2">Image Preview</span>
          <img
            src={imageUrl}
            className="image-fluid img-thumbnail col-md-6 h-50"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="photo"
            required
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://imageurl.com"
          />
          <Form.Text className="text-muted">Add the image URL here</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Title</Form.Label>
          <Form.Control required name="name" placeholder="Smart Watch" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            name="price"
            max={999}
            min={1}
            placeholder="Smart Watch"
          />
          <Form.Control.Feedback type="invalid">
            Price must be higher than 0, and if higher than 999
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control required name="code" placeholder="SMRT-WTCH" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Create;
