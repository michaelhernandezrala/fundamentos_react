import React from 'react';
import { useState } from 'react';
import FormControl from '../../common/FormControl/FormControl'
import Button from '../../common/Button/Button';
import Checkbox from '../../common/Checkbox/Checkbox';
import { login } from '../../../services/DataService';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import '../../../styles/sections/Login.css';
import { AuthContextConsumer } from '../../../utils/context';

function Login({ onLogin, history, location }) {

    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
    });
    const [checkOut, setCheckOut] = useState(false);
    const [error, setError] = useState({
        isError: false,
        message: ''
    });

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    };
    const handleChecked = (e) => {
        setCheckOut(e.target.checked)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!dataForm.email || !dataForm.password) {
            setError({
                isError: true,
                message: 'All the fields must to be filled'
            });
            return;
        }
        try {
            await login(dataForm, checkOut);
            onLogin();
            const { from } = location.state || { from: { pathname: '/' } };
            history.replace(from);
            setError({
                isError: false,
                message: ''
            });
        } catch (error) {
            setError({
                isError: true,
                message: error.data.message
            });
        }
    }

    return (
        <div className='login'>
            <section className='login__content'>
                <h1>Login</h1>
                <form className='login__form' onSubmit={handleSubmit}>
                    <FormControl
                        label='Email'
                        type='email'
                        name='email'
                        placeholder='example@example.com'
                        value={dataForm.email}
                        onChange={handleChange}
                        required
                        autofocus />
                    <FormControl
                        label='Password'
                        type='password'
                        name='password'
                        placeholder='Enter your password'
                        value={dataForm.password}
                        onChange={handleChange} />
                    <Checkbox
                        label='Remember the session'
                        checked={checkOut}
                        onChange={handleChecked}
                    />
                    <Button variant="primary" disabled={!dataForm.email || !dataForm.password}>Login</Button>
                    {error.isError ? <ErrorMessage setError={setError}>{error.message}</ErrorMessage> : ''}
                </form>
            </section>
        </div>
    )
}

const ConnectedLoginPage = props => (
    <AuthContextConsumer>
        {auth => <Login onLogin={auth.handleLogin} {...props}/>}
    </AuthContextConsumer>
)

export default ConnectedLoginPage
