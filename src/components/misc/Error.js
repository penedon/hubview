import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Error.css'

const Error = (props) => {
    let { error } = props;

    const renderResponseMsg = () => {
        if (error.hasOwnProperty('response')
            && error.response.hasOwnProperty('data')
            && error.response.data.hasOwnProperty('message')
        )
            return <p className='errorResponse'>{error.response.data.message}</p>
    }

    return (
        <div className="error">
            <FontAwesomeIcon 
                className="fa-3x"
                icon="fa-solid fa-triangle-exclamation" />
            <h5 className="errorTitle">{error.message}</h5>
            {renderResponseMsg()}
        </div>
    )
}

export default Error;