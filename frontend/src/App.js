// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventForm from './components/Eventform';
import ManageEvents from './components/ManageEvents'; // Import ManageEvents component

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<EventList />} />
                <Route path="/create-event" element={<EventForm />} />
                <Route path="/manage-events" element={<ManageEvents />} />
            </Routes>
        </Router>
    );
}

export default App;
