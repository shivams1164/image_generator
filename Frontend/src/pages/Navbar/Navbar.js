import React, { useContext } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import PointsContext from '../../context/pointsContext';

const Navbar = (props) => {
    const activeStyle = {
        color: 'red',
        textDecoration: 'underline'
    };
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('authToken');
        ctx.setIsLoggedIn(false);
        navigate('/login');
    };

    const links = [
        { key: 'home', url: '/', name: 'Home' },
        { key: 'image', url: '/image-generator', name: 'Image Generator' },
        { key: 'history', url: '/history', name: 'History' },
        { key: 'contact', url: '/contact', name: 'Contact' },
        { key: 'login', url: '/login', name: 'Login' },
        { key: 'signup', url: '/signup', name: 'Sign Up' },
    ];

    const ctx = useContext(PointsContext);

    return (
        <div className='header-container'>
            <div className='left'>
                {links.map(link => (
                    <Link key={link.key} style={props.page === link.key ? activeStyle : {}} to={link.url}>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className='right'>
                {ctx.userPoints}
            </div>
            <div>
                {ctx.isLoggedIn ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <button onClick={() => navigate('/login')}>Login</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
