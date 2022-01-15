import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../../../layout/Layout';
import { deleteAdvert, getAdvertDetail } from '../../../services/DataService';
import '../../../styles/sections/AdvertPage.css';
import Button from '../../common/Button/Button';
import Swal from 'sweetalert2'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import { useHistory } from 'react-router';

function AdvertPage({ match }) {
    const [advertDetail, setAdvertDetail] = useState({});
    const history = useHistory();
    useEffect(() => {
        getAdvertDetail(match.params.advertId)
        .then(data => setAdvertDetail(data))
        .catch((error) => {
            history.push('/404')
        });
    }, []);
    const { tags } = advertDetail;
    const handleClick = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((async (result) => {
            if (result.isConfirmed) {
                deleteAdvert(match.params.advertId).then(() => {
                    history.push('/');
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }).catch((error) => {
                    <ErrorMessage>{error.data.message}</ErrorMessage>
                })
            }
        }));

    }

    return (
        <Layout>
            <article className='advertPage'>
                <img className='advertPage__img' src={`http://localhost:3001${advertDetail.photo}`} alt='img' />
                <h1 className='advertPage__title'>{advertDetail.name}</h1>
                <div className='advertPage__info'>
                    <p className='advertPage__info--data'>
                        <strong className='advertPage__info--span'>Price:
                        </strong>{advertDetail.price} €
                    </p>
                    <p className='advertpage__info--data'>
                        <strong className='advertPage__info--span'>Sale:</strong>{JSON.stringify(advertDetail.sale)}
                    </p>
                    
                </div>
                <Button variant='primary' onClick={handleClick} className='advertPage__delete-button'>Delete advert</Button>
            </article>
        </Layout>
    )
}

export default AdvertPage
