import React from 'react';
import FormControl from '../FormControl/FormControl';
import '../../../styles/common/Search.css';

function Search({ filters, setFilters }) {

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
        } else {
            value = e.target.value;
        }
        setFilters({
            ...filters,
            [eventName]: value
        });
    }
    return (
        <aside className='search'>
            <form className='search__form'>
                <FormControl
                    label='Name'
                    type='text'
                    name='name'
                    placeholder='Car, bike ...'
                    onChange={handleChange}
                    value={filters.name}
                />
                <FormControl
                    label='Price'
                    type='number'
                    name='price'
                    placeholder='100 €'
                    onChange={handleChange}
                    value={filters.price}
                />
                <div className='form-control__search'>
                    <label htmlFor='sale'>Sale</label>
                    <select name='sale' onChange={handleChange} value={filters.sale}>
                        <option value='#'>-- Select an option --</option>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                    </select>
                </div>
                <div className='form-control__search'
                ><label htmlFor='tags'>Tags</label>
                    <select name='tags' multiple={true} onChange={handleChange} value={filters.tags}>
                        <option value='lifetyle'>Lifestyle</option>
                        <option value='mobile'>Mobile</option>
                        <option value='motor'>Motor</option>
                        <option value='work'>Work</option>
                    </select>
                </div>
            </form>
        </aside>
    )
}

export default Search
