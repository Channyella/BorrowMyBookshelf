import React, { useRef, useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Login() {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [user, pwd])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUser('');
        setPwd('');
    }

    return (
        <>
            {success ? (
                <section className="signup template d-flex justify-content-center align-items-center 100-w vh-100 pink-bg">
                    <div className='form_container p-5 rounded bg-white'>
                        <h1 className="text-center">Success!</h1>
                        <p className="text-center">
                            Your account has now been made. Please click link below to sign in: <br />
                            <Link to="/" className="ms-2 linkColor">Sign In </Link>
                        </p>
                    </div>
                </section>
            ) : (
                <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 pink-bg">
                    <div className='form_container p-5 rounded bg-white'>
                        <form onSubmit={handleSubmit}>
                            <p ref={errRef} className={errorMessage ? "errMsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                            <h3 className="text-center">Log In</h3>
                            <div className='mb-2'>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    id="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    placeholder="Enter Email"
                                    className='form-control'
                                    required
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    id="password"
                                    autoComplete="off"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    placeholder="Enter Password"
                                    className='form-control' />
                            </div>
                            <div className='mb-2'>
                                <input type="checkbox" className="custom-control custom-checkbox" id='check' />
                                <label htmlFor="check" className="custom-input-label ms-2">Remember Me</label>
                            </div>
                            <div className='d-grid'>
                                <button className='btn btn-primary'>Sign In</button>
                            </div>
                            <p className="text-end mt-2">
                                <Link to="/signUp" className="ms-2 linkColor">Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
export default Login