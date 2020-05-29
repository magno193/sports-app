import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Container, Input } from "reactstrap";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // cancela refresh

    const response = await api.post("/login", { email, password });
    const userId = response.data._id || false;

    if (userId) {
      localStorage.setItem("user", userId);
      history.push("/dashboard");
    } else {
      const { message } = response.data;
    }
  };

  return (
    <Container>
        <h2>Login:</h2>
        <p>Please <strong>Login</strong> into your account</p>
      <Form onSubmit={handleSubmit}>
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
