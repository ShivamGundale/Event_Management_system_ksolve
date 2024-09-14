import React, { useState } from 'react';
import axios from 'axios';
import './Eventform.css'; // Import the CSS

const EventForm = () => {
    const [event, setEvent] = useState({
        name: '',
        date: '',
        description: '',
        location: ''
    });

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/events', event)
            .then(response => {
                alert('Event created successfully');
                setEvent({
                    name: '',
                    date: '',
                    description: '',
                    location: ''
                });
            })
            .catch(error => {
                console.error('Error creating event:', error);
            });
    };

    return (
        <div className="event-form-container">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={event.name} onChange={handleChange} placeholder="Event Name" required />
                <input type="date" name="date" value={event.date} onChange={handleChange} required />
                <textarea name="description" value={event.description} onChange={handleChange} placeholder="Event Description"></textarea>
                <input type="text" name="location" value={event.location} onChange={handleChange} placeholder="Event Location" />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
