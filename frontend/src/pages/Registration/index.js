import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

export default function Registration({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // cancela refresh

    const response = await api.post("/login", { email, password });
    const userId = response.data._id || false;

    if (userId) {
      localStorage.setItem("user", userId);
      history.push("/login");
    } else {
      const { message } = response.data;
    }
  };

  return (
    <Container>
      <h2>Registration</h2>
      <p>Please <strong>Register</strong> to create a new account</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Your first name"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Your last name"
            onChange={(event) => setLastName(event.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Your e-mail"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}
