import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../utils/context';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import '../../styles/layout/Header.css'
import Swal from 'sweetalert2';
import {useHistory} from 'react-router';
import { logout } from '../../services/DataService';

function Header() {
    const { isLogged, handleLogout } = useContext(AuthContext);
    const history = useHistory();
    const handleClick = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async () => {
            handleLogout();
            await logout()
            history.push('/login')
        }
        );
    }
    return (
        <header className='header'>
            <Link to='/'>
                <div className='header__logo'>
                    APP
                </div>
            </Link>
            <nav className='header__nav'>
                <Button to='/adverts/new' variant='primary' as={Link}>New Advert</Button>

                {isLogged ? (
                    <Button onClick={handleClick}>Log out</Button>
                ) : (
                    <Button to='/login' variant='primary' as={Link}>Login</Button>
                )}
            </nav>
        </header>
    )
}

export default Header
