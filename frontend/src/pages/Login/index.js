import React, { useState } from 'react';
import api from '../../services/api';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function Login() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async event => {
        event.preventDefault(); // cancela refresh
    }

    return(
        <Form onSubmit={handleSubmit}>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                <Input type='email' name='email' id='exampleEmail' placeholder='Your e-mail' onChange={event => setEmail(event.target.value)} />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                <Input type='password' name='password' id='examplePassword' placeholder='Your password' onChange={event => setPassword(event.target.value)}/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
}