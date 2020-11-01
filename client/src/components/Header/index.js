import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            <div>
                <Link to="/">
                    <h1>Music Matchbox</h1>
                </Link>

                {Auth.loggedIn() ? (
                    <>
                        <Link to="/profile">My Profile</Link>
                        <a href="/" onClick={logout}>
                            Logout
                        </a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}        
            </div>
        </header>
    );
};

export default Header;