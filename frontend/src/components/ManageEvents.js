// src/components/ManageEvents.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEvents.css'; // Import CSS for ManageEvents

const ManageEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`http://localhost:3000/api/events/${eventId}`);
            alert('Event deleted successfully');
            fetchEvents(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="manage-events-container">
            <h2>Manage Events</h2>
            {events.length > 0 ? (
                <ul className="event-list">
                    {events.map(event => (
                        <li key={event._id} className="event-item">
                            <div className="event-details">
                                <h3>{event.name}</h3>
                                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                <p>Description: {event.description}</p>
                                <p>Location: {event.location}</p>
                            </div>
                            <button className="delete-button" onClick={() => handleDelete(event._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-events">No events available.</p>
            )}
        </div>
    );
};

export default ManageEvents;
