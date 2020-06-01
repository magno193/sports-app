import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import {Container, Button, Form, FormGroup, Input, Label, Alert, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import './events.css';

// EventsPage irá mostrar todos os eventos de um usuário logado
export default function EventsPage({history}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [sport, setSport] = useState('Select a Sport');
    const [date, setDate] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    const preview =  useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const handleSubmit = async (evnt) => {
        const user_id = localStorage.getItem('user');

        const eventData = new FormData()

        eventData.append('thumbnail', thumbnail);
        eventData.append('sport', sport);
        eventData.append('title', title);
        eventData.append('description', description);
        eventData.append('date', date);
        eventData.append('price', price);

        
            try {

                if (title !== '' && description !== '' && price !== '' && sport !== 'Select a Sport' && date !== '' && thumbnail !== null) {
                    await api.post('/event', eventData, {headers: {user_id}})
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 2000);
                } else {
                    setError(true);
                    setTimeout(() => {
                        setError(false);
                    }, 2000);

                    console.log('Missing required data');
                    
                }

            } catch (error) {
                console.log(error.message);  
            } 

        evnt.preventDefault();
        return ''
    }

    const sportEventHandler = (sport) => {
        setSport(sport)
    } 

    return(
        <Container>
            <h1>Create your event</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Upload image</Label>
                    <Label id='thumbnail' style={{backgroundImage : `url(${preview})`}} className={thumbnail ? 'has-thumbnail' : ''}>
                        <Input type='file' onChange={(evnt) => setThumbnail(evnt.target.files[0])} />
                        <img src={cameraIcon} style={{maxWidth: '50px'}} alt='Upload Icon Image' />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Title</Label>
                    <Input id='title' type='text' value={title} placeholder={'Event title'} onChange={(evnt) => setTitle(evnt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input id='description' type='text' value={description} placeholder={'Event description'} onChange={(evnt) => setDescription(evnt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Price</Label>
                    <Input id='price' type='text' value={price} placeholder={'Event price R$0,00'} onChange={(evnt) => setPrice(evnt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Date</Label>
                    <Input id='date' type='date' value={date} onChange={(evnt) => setDate(evnt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <Button disabled id="caret" value={sport}>{sport}</Button>
                    <DropdownToggle caret />
                    <DropdownMenu>
                        <DropdownItem onClick={() => sportEventHandler('running')}>running</DropdownItem>
                        <DropdownItem onClick={() => sportEventHandler('cycling')}>cycling</DropdownItem>
                        <DropdownItem onClick={() => sportEventHandler('swimming')}>swimming</DropdownItem>
                    </DropdownMenu>
                    </ButtonDropdown>
                </FormGroup>
                <FormGroup>
                    <Button type='submit' className='submit-btn'>Create Event</Button>
                </FormGroup>
                <FormGroup>
                    <Button className='secondary-btn' onClick={() => history.push("/")}>Dashboard</Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert  className='event-validation' color='danger'> Missing required information</Alert>
            ) : ''}
            {success ? (
                <Alert  className='event-validation' color='success'>The event was created successfully</Alert>
            ) : ''}
        </Container>
    )
}