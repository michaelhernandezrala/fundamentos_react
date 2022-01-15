import React from 'react';
import '../../../styles/common/Checkbox.css';

function Checkbox({label, name, checked, onChange}) {
    return (
        <div className='checkbox'>
            <label className='checkbox__label'>{label}</label>
            <input className='checkbox__input' name={name} type='checkbox' checked={checked} onChange={onChange}/>
        </div>
    )
}

export default Checkbox
