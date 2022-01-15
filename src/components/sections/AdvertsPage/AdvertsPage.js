import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import Layout from '../../../layout/Layout';
import { getListOfAdverts } from '../../../services/DataService';
import { Link } from 'react-router-dom';
import Advert from '../../common/Advert/Advert';
import Search from '../../common/Search/Search';
import '../../../styles/sections/AdvertsPage.css';
import NoFilteredResults from '../NoFilteredResults/NoFilteredResults';
import NoAdverts from '../NoAdverts/NoAdverts';
import {useHistory} from 'react-router';

function AdvertsPage() {

    const [adverts, setAdverts] = useState([]);
    const [advertsFiltered, setAdvertsFiltered] = useState([]);
    const [countAdverts, setCountAdverts] = useState(0)
    const [filters, setFilters] = useState({
        name: '',
        sale: '#',
        price: '',
        tags: [],
    });
    const history = useHistory();

    useEffect(() => {
        getListOfAdverts().then(data => {
            setAdverts(data);
            setAdvertsFiltered(data);
            setCountAdverts(data.length);
        }).catch(error => {
            if (error.status === 401) {
                return history.push('/login');
            }
        }) 
        ;
    }, []);

    useEffect(() => {
        const allAdverts = adverts;
        if (!isFiltersEmpty()) {
            let aux = [];
            for (const advert of allAdverts) {
                if (advert.name.includes(filters.name) && (((String(advert.sale) === filters.sale) && filters.sale !== '#') || filters.sale === '#')
                    && (JSON.stringify(advert.price).includes(filters.price))
                ) {
                    aux.push(advert)
                }
            }

            if (filters.tags.length > 0) {
                let aux2 = []
                for (const advert of aux) {
                    for (const tag of advert.tags) {
                        if (filters.tags.includes(tag) && !aux2.includes(advert)) {
                            aux2.push(advert);
                        }
                    }
                }
                setAdvertsFiltered(aux2);
                setCountAdverts(aux2.length);
            } else {
                setAdvertsFiltered(aux);
                setCountAdverts(aux.length);
            }
        }
    }, [filters]);

    const isFiltersEmpty = () => {
        if (!filters.name && filters.sale === '#' && filters.price === null && filters.tags.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const renderView = () => {
        if (adverts.length === 0) {
            return (
                <Fragment>
                    <p className='counter-adverts'><strong>Total Adverts </strong>{countAdverts}</p>
                    <div className='adverts-content'>
                        <Search filters={filters} setFilters={setFilters} />
                        <NoAdverts />
                    </div>
                </Fragment>
            )
        } else if (advertsFiltered.length === 0) {
            return (
                <Fragment>
                    <p className='counter-adverts'><strong>Total Adverts </strong>{countAdverts}</p>
                    <div className='adverts-content'>
                        <Search filters={filters} setFilters={setFilters} />
                        <NoFilteredResults />
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <p className='counter-adverts'><strong>Total Adverts </strong>{countAdverts}</p>
                    <div className='adverts-content'>
                        <Search filters={filters} setFilters={setFilters} />
                        <ul className='adverts-list'>
                            {advertsFiltered.map(({ id, ...advert }) => (
                                <li key={id} className='adverts-list-item'>
                                    <Link className='adverts-list-item-link' to={`/adverts/${id}`}>
                                        <Advert {...advert} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Fragment>
            )
        }
    }
    return (
        <Layout>
            {renderView()}
        </Layout>
    )
}

export default AdvertsPage
