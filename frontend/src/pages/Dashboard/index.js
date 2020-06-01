import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import moment from 'moment';
import './dashboard.css';
import {Button, ButtonGroup} from 'reactstrap'

export default function Dashboard({history}) {
    const [events, setEvents] = useState([]);
    const user_id = localStorage.getItem('user');

    const [rSelected, setRSelected] = useState(null);

    useEffect(()=>{
        getEvents();
    }, []);

    const filterHandler = (query) => {
        getEvents(query);
    }

    const getEvents = async(filter) => {

        const url = filter ? `/dashboard/${filter}` : '/dashboard'
        const response = await api.get(url, {headers:{ user_id }});

        setEvents(response.data);
    };
    console.log(user_id)
    console.log(events);
    return(
        <>
            <div>Filter:
                <ButtonGroup>
                    <Button color='primary' OnClick={() => filterHandler(null)} active={rSelected === null}>All Sports</Button>
                    <Button color='primary' OnClick={() => filterHandler('running')} active={rSelected === 'running'}>Running</Button>
                    <Button color='primary' OnClick={() => filterHandler('cycling')} active={rSelected === 'cycling'}>Cycling</Button>
                    <Button color='primary' OnClick={() => filterHandler('swimming')} active={rSelected === 'swimming'}>Swimming</Button>
                </ButtonGroup>
                <Button color="secondary" onClick={() => history.push('/events')}>New Event</Button>
            </div>
            <ul className='events-list'>
                {events.map(event => (
                    <li key={event._id}>
                        <header style={{backgroundImage: `url(${event.thumbnail_url})`}} />
                        <strong>{event.title}</strong>
                        <span>Event date: {moment(event.date).format('l')}</span>
                        <span>Event price: $ {parseFloat(event.price).toFixed(2)}</span>
                        <span>Event description: {event.description}</span>
                        <Button color='primary'>Subscribe</Button>
                    </li>
                ))}
            </ul>
        </>
    )
}