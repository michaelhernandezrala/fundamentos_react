import React from 'react';
import { IoMdClose } from "react-icons/io";
import '../../../styles/common/ErrorMessage.css'

function ErrorMessage({setError, children}) {

    const handleClick = (e) => {
        e.preventDefault();
        setError({
            isError: false,
            message: ''
        })
    } 

    return (
        <div className='error' >
            <p className='error-message'>{children}</p>
            <IoMdClose className='error-icon' onClick={handleClick}/>
        </div>
    )
}

export default ErrorMessage
