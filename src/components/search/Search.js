import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from "react-router-dom";

import githubAxios from 'axios/github';
import Loading from 'components/misc/Loading';
import Error from 'components/misc/Error';

const Search = () => {
    let [query, setQuery] = useState("");
    let [timeoutSearch, setTimeoutSearch] = useState(null);
    let [loading, setLoading] = useState(false);
    let [response, setResponse] = useState([]);
    let [error, setError] = useState(null);
    let navigate = useNavigate();

    const searchUser = (user) => {
        githubAxios.get(`search/users?q=${user}&per_page=5`)
        .then(res => {
            setResponse(res.data.items);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            setError(err);
        })
    }
    
    const debounce = (timeout, functionCallBack) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        return setTimeout(() => functionCallBack(), 1200)
    }
    
    const debouceSearchUser = (timeout, user) => {          
        return debounce (
            timeout,
            () => {
                searchUser (user)
            }
        )
    }

    const handleSearch = (timeout, e,) => {
        setQuery(e.target.value);
        if (e.target.value.length >= 3) {
            setLoading(true);
            setTimeoutSearch(debouceSearchUser(timeout, e.target.value))
        } else {
            setLoading(false);
        }
    };

    const handleUserClick = (username) => {
        setResponse([]);
        setQuery("");
        setTimeout(null);
        navigateToProfile(username);
    }

    const renderLoading = () => {
        return (
            <li key='loading'>
                <Loading />
            </li>
        )
    }

    const navigateToProfile = (username) => {
        const path = `/profile/${username}/`
        navigate(path, {
            state: {
                username: username,
            }
        })
    }

    const renderResponse = () => {
        let render = []
        response.forEach((e) => {
            render.push(
                <li key={e.login}
                    onClick={() => handleUserClick(e.login)}>
                    <div className='img'>
                        <img src={e.avatar_url} alt="" />
                    </div>
                    <p>{e.login}</p>
                </li>
            )
        });
        return render
    }

    const renderDropBox = () => {
        if (query && query.length >= 3) {
            let content = null;
            if (loading) 
                content = renderLoading();
            else if (error)
                content = (<Error error={error}/>);
            else if (response.length === 0)
                content = (
                    <li>
                        <p>No user found</p>
                    </li>
                )
            else
                content = renderResponse()
            return (
                <div className='searchContent'>
                    <ul>
                        {content}
                    </ul>
                </div>
            )
        } 
    }

    return (
        <div>
            <input type='text'
                   placeholder='Search User...'
                   value={query}
                   onChange={(e) => {handleSearch(timeoutSearch, e)}}>
            </input>
            {renderDropBox()}
        </div>
    )
}

export default Search;