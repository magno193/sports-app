import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Label, Input, Container, Alert } from "reactstrap";

export default function Registration({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // cancela refresh


    if(email !== '' && password !== '' && firstName !== lastName){
      const response = await api.post("/user/register", {
        email,
        password,
        firstName,
        lastName,
      });
      const userId = response.data._id || false;
  
      if (userId) {
        localStorage.setItem("user", userId);
        history.push("/dashboard");
      } else {
        const { message } = response.data;
        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage('')
        }, 2000);
      }
    } else {
      setError(true);
      setErrorMessage('You need to fill all the inputs.');
      setTimeout(() => {
        setError(false);
        setErrorMessage('')
      }, 2000);
    }

  };

  return (
    <Container>
      <h2>Registration</h2>
      <p>
        Please <strong>Register</strong> to create a new account
      </p>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
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
        </div>
        <FormGroup>
          <Button className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
          <Button className="secondary-btn" onClick={() => history.push("/login")}> Login instead? </Button>
        </FormGroup>
      </Form>
      {error ? (
                <Alert  className='event-validation' color='danger'>{errorMessage}</Alert>
            ) : ''}
    </Container>
  );
}
