import React from 'react';
import './Loading.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = () => {
    return (
        <div className='loading'>
            <FontAwesomeIcon icon="fa-solid fa-circle-notch" className='fa-spin' />
        </div>
    )
}

export default Loading;