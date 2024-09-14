import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RSVPForm from './RSVPForm';
import './EventList.css'; // Import CSS

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [rsvps, setRsvps] = useState([]);

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

    const handleEventSelect = async (eventId) => {
        if (selectedEvent === eventId) {
            // Hide form if the same event is clicked again
            setSelectedEvent(null);
            setRsvps([]);
        } else {
            // Show form and fetch RSVPs for the selected event
            setSelectedEvent(eventId);
            try {
                const response = await axios.get(`http://localhost:3000/api/rsvps/${eventId}`);
                setRsvps(response.data);
            } catch (error) {
                console.error('Error fetching RSVPs:', error);
            }
        }
    };

    return (
        <div className="event-list-container">
            <h2>Event List</h2>
            {events.length > 0 ? (
                <ul>
                    {events.map(event => (
                        <li key={event._id} className="event-item">
                            <h3>{event.name}</h3>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Description: {event.description}</p>
                            <p>Location: {event.location}</p>
                            <button onClick={() => handleEventSelect(event._id)}>
                                {selectedEvent === event._id ? 'Hide RSVP Form' : 'RSVP'}
                            </button>
                            {selectedEvent === event._id && (
                                <div className="rsvp-section">
                                    <RSVPForm eventId={selectedEvent} />
                                    <h4>RSVPs:</h4>
                                    <ul>
                                        {rsvps.map(rsvp => (
                                            <li key={rsvp._id}>{rsvp.name} ({rsvp.email})</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default EventList;
