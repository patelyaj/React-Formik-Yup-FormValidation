import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../src/features/auth/authSlice';
import { useNavigate } from "react-router-dom";
function Login() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    // YUP  
    const loginSchema = Yup.object({
        username: Yup.string().required('Username is required').min(2, 'Too Short!'),
        password: Yup.string().required('Password is required').min(8, 'Too Short!'),
    });

    // Formik 
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                // values = { username: '',password: ''}
                const res = await dispatch(loginUser(values)).unwrap();
                console.log("res",res);
                navigate('/products')
            } catch (error) {
                console.log("err",error);
            }
        },
    });

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>

                {/* 1. Error Display */}
                {error && <div className="api-error-message">{error}</div>}

                <form onSubmit={formik.handleSubmit}>   
                    <div className="input-group">
                        <input
                        type="text"
                        placeholder="Username"
                        {...formik.getFieldProps("username")}
                        />

                        {formik.submitCount > 0 &&  formik.errors.username && (
                        <p className="required-field-error" style={{color:'red'}}>{formik.errors.username}</p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="input-group">
                        <input
                        type="password"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                        />

                        {formik.submitCount > 0 && formik.errors.password && (
                        <p className="required-field-error">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* 4. Submit Button */}
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Logging in... wait' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
        
    );
}

export default Login;