import React from 'react';

interface LoginFormProps {
    placeholder: string;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    return (
        <div className="loginForm">
            <form>
                <label> Username: </label>
                <input placeholder={props.placeholder} />
            </form>
        </div>
    );
} 

export default LoginForm;