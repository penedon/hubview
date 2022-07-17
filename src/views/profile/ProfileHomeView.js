import React, { useEffect, useState } from 'react';
import githubAxios from 'axios/github'
import { useParams, Link } from 'react-router-dom';
import HeaderMenu from 'components/menu/HeaderMenu';
import Profile from 'components/profile/Profile';
import ProfileRepos from 'components/profile/ProfileRepos';
import { Container } from 'react-bootstrap';
import './ProfileHomeView.css';



const ProfileHomeView = () => {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [userRepos, setUserRepos] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingRepos, setLoadingRepos] = useState(false);

    const fetchProfile = () => {
        setLoadingProfile(true);
        return githubAxios.get(`users/${username}`)
            .then(response => {
                setLoadingProfile(false);
                return response.data;
            })
            .catch(() => {
                setLoadingProfile(false);
            })
    }
    
    const fetchRepos = () => {
        setLoadingRepos(true);
        return githubAxios.get(`users/${username}/repos?sort=updated&direction=desc`)
            .then(response => {
                setLoadingRepos(false);
                return response.data;
            })
    };

    useEffect(() => {
        document.title = `${username} | HubView `
        fetchProfile().then(setUserProfile);
        fetchRepos().then(setUserRepos);
    }, [username]);

    
    return (
        <div className='profileHomeView'>
            <HeaderMenu />
            <Container>
                <Profile 
                    profile={userProfile}
                    loading={loadingProfile}
                >
                    <ProfileRepos
                        repos={userRepos}
                        loading={loadingRepos}
                    />
                </Profile>
            </Container>
            <div className='pageFooter'>
                Code developed by <Link to="/profile/penedon">@penedon</Link>
            </div>
        </div>
    );
};

export default ProfileHomeView;