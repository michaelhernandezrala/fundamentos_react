import React from 'react';
import { useState } from 'react';
import Layout from '../../../layout/Layout';
import FormControl from '../../common/FormControl/FormControl';
import Button from '../../common/Button/Button';
import { postNewAdvert } from '../../../services/DataService';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import '../../../styles/sections/NewAdvertPage.css';
import { Redirect, useHistory } from 'react-router';

function NewAdvertPage() {

    const [newAdvert, setNewAdvert] = useState({
        name: '',
        sale: '#',
        price: '',
        tags: [],
        photo: ''
    });
    const [error, setError] = useState({
        isError: false,
        message: ''
    });
    const [advertId, setAdvertId] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        const eventName = e.target.name;
        let value = null;
        if (e.target.type === 'select-multiple') {
            value = [];
            const options = e.target.options;
            for (const option of options) {
                if (option.selected) {
                    value.push(option.value);
                }
            }
        } else if (e.target.type === 'file') {
            value = e.target.files[0]
        }else {
            value = e.target.value;
        }
        setNewAdvert({
            ...newAdvert,
            [eventName]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newAdvert.name || newAdvert.sale === '#' || newAdvert.price === '' || newAdvert.tags.length === 0) {
            setError({
                isError: true,
                message: 'All the fields must to be filled except file'
            });
            return;
        }
        setError({
            isError: false,
            message: ''
        });
        try {
            
            let formData = new FormData();
            formData.append('name', newAdvert.name);
            formData.append('sale', newAdvert.sale);
            formData.append('price', newAdvert.price);
            formData.append('tags', newAdvert.tags);
            if (newAdvert.photo) {
                formData.append('photo', newAdvert.photo);
            }
            const createdAdvert = await postNewAdvert(formData);
            setAdvertId(createdAdvert.id);

        } catch (error) {
            if (error.data.status === 401) {
                return history.push('/login');
            }
        
            setError({
                isError: true,
                message: error.data.message
            });
        }
    }

    if (advertId) {
        return <Redirect to={`/adverts/${advertId}`} />
    }
    
    return (
        <Layout>
            <div className='new-advert'>
                <section className='new-advert__content'>
                    <h1>New Advert</h1>
                    <form className='new-advert__form' onSubmit={handleSubmit}>
                        <FormControl
                            label='Name'
                            type='text'
                            name='name'
                            placeholder='Car, bike ...'
                            onChange={handleChange}
                            value={newAdvert.name}
                        />
                        <FormControl
                            label='Price'
                            type='number'
                            name='price'
                            placeholder='100 €'
                            onChange={handleChange}
                            value={newAdvert.price}
                        />
                        <div className='form-control__new-advert'>
                            <label htmlFor='sale'>Sale</label>
                            <select name='sale' onChange={handleChange}>
                                <option value='#'>-- Select an option --</option>
                                <option value='true'>True</option>
                                <option value='false'>False</option>
                            </select>
                        </div>
                        <div className='form-control__new-advert'>
                            <label htmlFor='tags'>Tags</label>
                            <select name='tags' multiple={true} onChange={handleChange} value={newAdvert.tags}>
                                <option value='lifetyle'>Lifestyle</option>
                                <option value='mobile'>Mobile</option>
                                <option value='motor'>Motor</option>
                                <option value='work'>Work</option>
                            </select>
                        </div>
                        <div className='form-control__new-advert'>
                            <label>File</label>
                            <input name='photo' onChange={handleChange}  type='file' />
                        </div>
                        <Button className='new-advert__button' variant="primary" disabled={!newAdvert.name || newAdvert.sale === '#' || newAdvert.price === '#' || newAdvert.tags.length === 0}>Create Advert</Button>
                        {error.isError ? <ErrorMessage setError={setError}>{error.message}</ErrorMessage> : ''}
                    </form>
                </section>
            </div>
        </Layout>
    )
}

export default NewAdvertPage
