import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar

const Navbar = () => {
    const [redirectToCreate, setRedirectToCreate] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (redirectToCreate) {
            navigate('/create-event');
        } else {
            navigate('/');
        }
        setRedirectToCreate(!redirectToCreate);
    };

    const handleManageEventsClick = () => {
        navigate('/manage-events');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
            <img src="/Ksolves_logo.png" alt="Logo" className="logo" />

            </div>
            <div className="navbar-center">
                <h1>Ksolves - Event Management Portal</h1>
            </div>
            <ul className="navbar-right">
                <li>
                    <button onClick={handleButtonClick}>
                        {redirectToCreate ? 'Go to Event List' : 'Create Event'}
                    </button>
                </li>
                <li>
                    <button onClick={handleManageEventsClick}>Manage Events</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
