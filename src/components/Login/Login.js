import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './Login.css'
import auth from '../firebase.init';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate()

    const handleEmailBlur = event => {
        setEmail(event.target.value)
    }
    const handlePasswordBlur = event => {
        setPassword(event.target.value)
    }

    if (user) {
        navigate("/shop")
    }


    const handleSignInUser = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(email, password)
    }

    return (
        <div>
            <form onSubmit={handleSignInUser}>
                <div className="form-container">
                    <div>
                        <h2 className='form-title'>Login</h2>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input onBlur={handleEmailBlur} type="email" name="email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input onBlur={handlePasswordBlur} type="password" name="password" required />
                        </div>
                        <p style={{ color: "red" }}>{error?.message}</p>
                        {
                            loading && <p>Loading...</p>
                        }
                        <input className='form-submit' type="submit" value="Login" />
                        <p className='form-text'>
                            New to Emao-John? <Link className='form-link' to="/signup">Create New Account</Link>
                        </p>
                        <div className='or'>
                            <div></div>
                            <p>or</p>
                            <div></div>
                        </div>
                        <button className='google-sign-in-btn'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" alt="" />
                            <p>Continue with google</p>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;