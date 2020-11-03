import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header className="sticky-top bg-dark mb-2">
            <div className="d-flex flex-row align-items-center flex-wrap justify-content-sm-center justify-content-lg-between">
                <Link to="/">
                    <h1 className="mr-auto p-2">Music Matchbox</h1>
                </Link>
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <Link className="p-2" to="/profile">My Profile</Link>
                            <Link className="p-2" to="/musicians">Find Musicians</Link>
                            <a className="p-2" href="/" onClick={logout}>
                                Logout
                            </a>
                        </>
                    ) : (
                        <>
                            <Link className="p-2" to="/login">Login</Link>
                            <Link className="p-2" to="/signup">Signup</Link>
                        </>
                    )}        
                </div>
            </div>
        </header>
    );
};

export default Header;