import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './Login.css'
import auth from '../firebase.init';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
    const googleProvider = new GoogleAuthProvider()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [googleUser, setGoogleUser] = useState({})

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const location = useLocation()


    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || "/"

    const handleEmailBlur = event => {
        setEmail(event.target.value)
    }
    const handlePasswordBlur = event => {
        setPassword(event.target.value)
    }

    if (user) {
        navigate(from, { replace: true })
    }


    const handleSignInUser = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(email, password)
    }

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const googleUser = result.user;
                setGoogleUser(googleUser)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error)
            })
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
                        <button onClick={handleGoogleSignIn} className='google-sign-in-btn'>
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