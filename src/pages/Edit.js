import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Edit = (props) => {
  const [profileState, setProfileState] = useState(props);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setProfileState(props.location.myCustomProps);
    setImageUrl(props.location.myCustomProps.photo);
    setIsLoading(false);
  }, [props]);

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
      const result = await axios.put(
        `https://berkkarslan-json-server.herokuapp.com/products/${id}`,
        json
      );
      if (result.status === 200) {
        history.push("/");
      }
    }
  };

  if (isLoading) {
    return <div>loading..</div>;
  }

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
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://imageurl.com"
          />
          <Form.Text className="text-muted">Add the image URL here</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            required
            name="name"
            value={profileState.name}
            onChange={(event) =>
              setProfileState((prevProps) => ({
                ...prevProps,
                [event.target.name]: event.target.value,
              }))
            }
            placeholder="Smart Watch"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            name="price"
            value={profileState.price}
            onChange={(event) =>
              setProfileState((prevProps) => ({
                ...prevProps,
                [event.target.name]: event.target.value,
              }))
            }
            max={999}
            min={1}
            placeholder="200"
          />
          <Form.Control.Feedback type="invalid">
            Price must be higher than 0, and if higher than 999
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control
            required
            value={profileState.code}
            onChange={(event) =>
              setProfileState((prevProps) => ({
                ...prevProps,
                [event.target.name]: event.target.value,
              }))
            }
            name="code"
            placeholder="SMRT-WTCH"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Edit;
