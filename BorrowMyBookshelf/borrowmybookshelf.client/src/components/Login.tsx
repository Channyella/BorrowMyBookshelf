import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Login() {
    return (
        <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 pink-bg">
            <div className='form_container p-5 rounded bg-white'>
                <form>
                    <h3 className="text-center">Log In</h3>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" className= 'form-control'/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <input type="checkbox" className="custom-control custom-checkbox" id='check' />
                        <label htmlFor="check" className="custom-input-label ms-2">Remember Me</label>
                    </div>
                    <div className='d-grid'>
                        <button className = 'btn btn-primary'>Sign In</button>
                    </div>
                    <p className="text-end mt-2">
                        <a href="" className="linkColor"> Forgot Password?</a><Link to="/signUp" className="ms-2 linkColor">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Login