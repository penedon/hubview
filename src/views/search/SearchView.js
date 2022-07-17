import React, { useEffect } from 'react';
import style from './SearchView.module.css';
import { Container } from 'react-bootstrap';
import Search from 'components/search/Search';
import { Link } from 'react-router-dom';

const SearchView = () => {

    useEffect(() => {
        document.title = 'HubView'
    }, []);

    return (
        <div className='view'>
            <Container>
                <div className={style.box}>
                    <div className={style.logo}>
                        HubView
                    </div>
                    <div className={style.search}>
                        <Search />
                    </div>
                </div>
                {/* <TopContributors contributors={contributors}/> */}
            </Container>
            <div className={style.pageFooter}>
                Code developed by <Link to="/profile/penedon">@penedon</Link>
            </div>
        </div>
    )
}

export default SearchView;