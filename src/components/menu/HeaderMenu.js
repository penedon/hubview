import React from 'react'
import './HeaderMenu.css'
import { useNavigate } from 'react-router-dom';

import Search from 'components/search/Search'

const HeaderMenu = () => {
    let navigate = useNavigate();

    return (
        <div className='headerMenu'>
            <div className='logo'
                 onClick={() => navigate('/search')}>
                    <h1>HubView</h1>
            </div>
            <div className='search'>
                <Search />
            </div>
        </div>
    )
}

export default HeaderMenu;