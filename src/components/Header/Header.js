import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import auth from '../firebase.init';
import './Header.css';

const Header = () => {
    const [user] = useAuthState(auth)

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out successfull");
            })
            .catch((error => {
                console.log("error")
            }))
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/shop">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user ?
                        <button style={{ cursor: "pointer" }} onClick={handleSignOut}>sign out</button> :
                        <Link to="/login">Login</Link>
                }
            </div>
        </nav>
    );
};

export default Header;