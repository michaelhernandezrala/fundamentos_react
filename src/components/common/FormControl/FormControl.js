import React from 'react';
import '../../../styles/common/FormControl.css'

function FormControl({label, type, name, placeholder, required, autofocus, value, onChange}) {
    return (
        <div className='form-control'>
            <label className='form-control__label'>{label}</label>
            <input className='form-control__input' type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    )
}

export default FormControl
