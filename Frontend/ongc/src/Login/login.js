
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validation from '../Utility/loginvalidation';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [error, setError] = useState({});
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(validation(values));
        // if (Object.keys(error).length === 0) {
        if (error.email === "" && error.password === "") {
            axios.post('http://localhost:9000/Login', values)
                .then(res => {
                    if (res.data === "success") {
                        navigate('/Home');
                    } else {
                        // navigate('/Signup')
                        alert("NO RECORD EXISTED. PLEASE SIGN UP....");

                    }
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <div className='Signup template d-flex justify-content-center w-100 vh-100  justify-content-center align-items-center containerStyle'>
            <div className='bg-white p-5 rounded  upacity'>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            className='form-control rounded-0'
                            onChange={handleInput}
                        />
                        {error.email && <span className='text-danger'>{error.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'> <strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            name='password'
                            className='form-control rounded-0'
                            onChange={handleInput}
                        />
                        {error.password && <span className='text-danger'>{error.password}</span>}
                    </div>
                    <p className='Paragraph'>You agree to the terms and conditions + policies</p>
                    <button type='submit' className='btn btn-success w-100 rounded-0 text-decoration-none'>Login.</button>
                    <p className='Paragraph'>you need to create account</p>
                    <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
