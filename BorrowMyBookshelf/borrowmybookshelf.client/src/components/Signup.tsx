import React, { useRef, useState, useEffect, FormEvent } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { AxiosError, AxiosResponse } from 'axios';

const userRegex = /^[a-zA-Z][a-zA-Z'\-\s]+$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const pwdRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const registerURL = 'api/signup';

function SignUp() {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);

    useEffect(() => {
        const result = userRegex.test(firstName);
        console.log(result);
        console.log(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = userRegex.test(lastName);
        console.log(result);
        console.log(lastName);
        setValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        const result = emailRegex.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = pwdRegex.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, email, pwd, matchPwd]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const v1 = userRegex.test(firstName);
        const v2 = userRegex.test(lastName);
        const v3 = emailRegex.test(email);
        const v4 = pwdRegex.test(pwd);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrorMessage("Invalid Entry");
            return;
        }
        try {
            // send as form data
            const data = new FormData();
            data.append("FirstName", firstName);
            data.append("LastName", lastName);
            data.append("Email", email);
            data.append("PasswordHash", pwd);
            const response = await axios.post<AxiosResponse<object, object>>(registerURL, data,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            console.log(response.data);
            console.log(JSON.stringify(response));
            setSuccess(true);
            //clear input fields, set back to empty strings.
        } catch (err: unknown) {
            if (!err || !(err instanceof Error)) {
                setErrorMessage("No Server Response");
            } else {
                const errorResponse = err as AxiosError<unknown>;
                if (errorResponse.response?.status === 409) {
                    setErrorMessage("Already Taken.")
                } else {
                    setErrorMessage("Registration Failed.")
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
                <div className="signup template d-flex justify-content-center align-items-center 100-w vh-100 pink-bg">
                    <div className='form_container p-5 rounded bg-white'>
                        <form onSubmit={handleSubmit}>
                            <p ref={errRef} className={errorMessage ? "errMsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                            <h3 className="text-center">Sign Up</h3>
                            <div className='mb-2'>
                                <label htmlFor="firstName">First Name
                                    <span className={validFirstName ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input type="text"
                                    id="firstName"
                                    ref={firstNameRef}
                                    autoComplete="off"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    aria-invalid={validFirstName ? "false" : "true"}
                                    aria-describedby="firstNameNote"
                                    onFocus={() => setFirstNameFocus(true)}
                                    onBlur={() => setFirstNameFocus(false)}
                                    placeholder="Enter First Name"
                                    className='form-control'
                                />
                                <p id="firstNameNote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Please enter valid first name.<br />
                                    Letters, apostrophes, spaces, and hyphens allowed.
                                </p>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="lastName">Last Name
                                    <span className={validLastName ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validLastName || !lastName ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input type="text"
                                    id="lastName"
                                    ref={lastNameRef}
                                    autoComplete="off"
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    aria-invalid={validLastName ? "false" : "true"}
                                    aria-describedby="lastNameNote"
                                    onFocus={() => setLastNameFocus(true)}
                                    onBlur={() => setLastNameFocus(false)}
                                    placeholder="Enter Last Name"
                                    className='form-control'
                                />
                                <p id="lastNameNote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Please enter valid last name.<br />
                                    Letters, apostrophes, spaces, and hyphens allowed.
                                </p>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="email">Email
                                    <span className={validEmail ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validEmail || !email ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input type="email"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailNote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    placeholder="Enter Email"
                                    className='form-control' />
                                <p id="emailNote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Please enter valid email.<br />
                                </p>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="password">Password
                                    <span className={validPwd ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdNote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    placeholder="Enter Password"
                                    className='form-control' />
                                <p id="pwdNote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must contain 8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number, and a special character.<br />
                                    Allowed special characters are:
                                    <span aria-label="exclamation mark">!</span>
                                    <span aria-label="at symbol">@</span>
                                    <span aria-label="hashtag">#</span>
                                    <span aria-label="dollar sign">$</span>
                                    <span aria-label="percent symbol">%</span>
                                </p>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="passwordMatch">Re-Enter Password
                                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input type="password"
                                    id="passwordMatch"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmNote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    placeholder="Enter Password"
                                    className='form-control'
                                />
                                <p id="confirmNote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p>
                            </div>
                            <div className='d-grid mt-2'>
                                <button disabled={!validFirstName || !validLastName || !validEmail || !validPwd || !validMatch ? true : false} className='btn btn-primary'>Sign Up</button>
                            </div>
                            <p className="text-end mt-2">
                                Already Registered? <Link to="/" className="ms-2 linkColor">Click here to sign in.</Link>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}


export default SignUp