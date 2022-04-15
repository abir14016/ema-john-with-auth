import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import './SignUp.css'

const SignUp = () => {
    const [email, setEamil] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')


    const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth)
    const navigate = useNavigate()

    const handleEmailBlur = event => {
        setEamil(event.target.value);
    }
    const handlePasswordBlur = event => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordBlur = event => {
        setConfirmPassword(event.target.value);
    }

    if (user) {
        navigate('/shop')
    }
    const handleCreateUser = event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("two password didn't match")
            return;
        }
        if (password.length < 6) {
            setError("password must be more than 6 characters")
            return;
        }
        createUserWithEmailAndPassword(email, password);
    }

    return (
        <div>
            <form onSubmit={handleCreateUser}>
                <div className="form-container">
                    <div>
                        <h2 className='form-title'>Sign Up</h2>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input onBlur={handleEmailBlur} type="email" name="email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input onBlur={handlePasswordBlur} type="password" name="password" id="" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirm password">Confirm Password</label>
                            <input onBlur={handleConfirmPasswordBlur} type="password" name="password" required />
                        </div>
                        <p style={{ color: "red" }}>{error}</p>
                        <input className='form-submit' type="submit" value="Sign up" />
                        <p className='form-text'>
                            Already Have An Account? <Link className='form-link' to="/login">Please Login</Link>
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

export default SignUp;