import React from 'react';
import api from '../../services/api';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function Login() {
    return(
        <Form>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                <Input type='email' name='email' id='exampleEmail' placeholder='Your e-mail'></Input>
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                <Input type='password' name='password' id='examplePassword' placeholder='Your password'></Input>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
}