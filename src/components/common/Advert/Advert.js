import React from 'react';
import '../../../styles/common/Advert.css'

function Advert({name, price, sale, tags, photo}) {
    return (
        <article className='advert'>
            <img className='advert__img' src={`http://localhost:3001${photo}` ? `http://localhost:3001${photo}` : `http://localhost:3001/public/notimage.png`}/>
            <h1 className='advert__title'>{name}</h1>
            <div className='advert__info'>
                <p className='advert__info--data'>
                    <strong className='advert__info--span'>Price:</strong>{price} €
                </p>
                <p className='advert__info--data'>
                    <strong className='advert__info--span'>Sale:</strong>{JSON.stringify(sale)}
                </p>
                <p className='advert__info--tags'>
                    {tags.map(tag => (
                        <span className='advert__info--tag'>{tag}</span>
                    ))}
                </p>
            </div>
        </article>
    )
}

export default Advert
