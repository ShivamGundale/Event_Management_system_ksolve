import React, { useState } from 'react';
import axios from 'axios';

const RSVPForm = ({ eventId }) => {
    const [rsvp, setRsvp] = useState({
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setRsvp({ ...rsvp, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/rsvps', { ...rsvp, eventId })
            .then(response => {
                alert('RSVP submitted successfully');
                setRsvp({
                    name: '',
                    email: ''
                });
            })
            .catch(error => {
                console.error('Error submitting RSVP:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={rsvp.name} onChange={handleChange} placeholder="Your Name" required />
            <input type="email" name="email" value={rsvp.email} onChange={handleChange} placeholder="Your Email" required />
            <button type="submit">RSVP</button>
        </form>
    );
};

export default RSVPForm;
