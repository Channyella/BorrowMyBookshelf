import React, { useRef, useState, useEffect, FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { GetCurrentUser, SetAuthCookie } from '../helpers/AuthHelper';

const loginURL = 'api/login';

function Login() {
    const { setAuth } = useContext(AuthContext);
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

        try {
            const data = new FormData();
            data.append("Email", user);
            data.append("Password", pwd);
            const response: AxiosResponse<string> = await axios.post(loginURL, data,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            const token = response.data;
            SetAuthCookie(token);
            console.log(GetCurrentUser());
            const userInfo = GetCurrentUser();
            setAuth(userInfo);
            setUser('');
            setPwd('');
            setSuccess(true);

        } catch (err: unknown) {
            if (!err || !(err instanceof Error)) {
                setErrorMessage("No Server Response");
            } else {
                const errorResponse = err as AxiosError<unknown>;
                if (errorResponse.response?.status === 400) {
                    setErrorMessage("Missing Username or Password")
                } else if (errorResponse.response?.status === 401) {
                    setErrorMessage("Unauthorized")
                } else {
                    setErrorMessage('Login Failed.')
                }
                errRef.current?.focus();
            }
        }
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
                            <div className='d-grid'>
                                <button className='btn btn-primary'>Sign In</button>
                                </div>
                           
                                <p className="text-end mt-2">
                                Don&apos;t have an account?
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