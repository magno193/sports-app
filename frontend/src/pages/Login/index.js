import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Container, Input, Alert } from "reactstrap";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // cancela refresh

    const response = await api.post("/login", { email, password });
    const userId = response.data._id || false;

    try {
      if (userId) {
        localStorage.setItem("user", userId);
        history.push("/");
      } else {
        const { message } = response.data;
        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
      }
    } catch (error) {
      setError(true);
      setErrorMessage('Error, the server returned an error')
    }
  };

  return (
    <Container>
      <h2>Login:</h2>
      <p>
        Please <strong>Login</strong> into your account
      </p>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
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
        </div>
        <FormGroup>
          <Button type='submit' className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
          <Button
            className="secondary-btn"
            onClick={() => history.push("/registration")}
          >
            New Account
          </Button>
        </FormGroup>
      </Form>
      {error ? (
                <Alert  className='event-validation' color='danger'>{errorMessage}</Alert>
            ) : ''}
    </Container>
  );
}
