import React from 'react';
import '../../../styles/sections/NoAdverts.css';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';

function NoAdverts() {
    return (
        <div className='no-adverts'>
            <Button to='/adverts/new' variant='primary' as={Link}>Create advert</Button>
        </div>
    )
}

export default NoAdverts
