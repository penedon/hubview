import React, { useEffect, useState } from "react";
import './Profile.css'
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nFormatter } from 'helpers/format';
import Loading from "components/misc/Loading";
import Error from "components/misc/Error";

const Profile = (props) => {
    let [loading, setLoading] = useState(false);
    let [profile, setProfile] = useState({
        login: null,
        bio: null
    });
    
    useEffect(() => {
        setProfile(props.profile);
        setLoading(props.loading);
    }, [props]);

    const renderProfileHeader = () => {
        if (profile) {
            return (
                <div className="profileHeader">
                    <Row>
                        <Col sm={4} md={4} lg={5}>
                            <div className="leftHeader">
                                <ul>
                                    <li key='followers' title="Followers">
                                        <FontAwesomeIcon icon='fa-user-group'/> {nFormatter(profile.followers, 1)}
                                    </li>
                                    <li key='following' title="Following">
                                        <FontAwesomeIcon icon='fa-eye'/> {nFormatter(profile.following, 1)}
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={4} md={4} lg={2} className="imgContainer">
                            <div className="imgBox">
                                <img src={profile.avatar_url} alt="" />
                            </div>
                        </Col>
                        <Col sm={4} md={4} lg={5}>
                        <div className="rightHeader text-right">
                                <ul>
                                    <li key="location" title="Location">
                                        <FontAwesomeIcon icon='fa-location-dot'/> {profile.location}
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <h1>
                                {profile.login}
                                <a href={profile.html_url}>
                                    <FontAwesomeIcon icon="fa-arrow-up-right-from-square" />
                                </a>
                            </h1>
                            <p className="login">
                                {profile.name}
                            </p>
                            <p className="bio">{profile.bio}</p>
                        </Col>
                    </Row>
                    
                </div>
            )
        } 
    }

    const renderProfile = () => {
        if (profile) {
            return (
                <div>
                    {renderProfileHeader()}
                    <div className="profileBody">
                        {props.children}
                    </div>
                </div>
            )
        }
        else if (loading) 
            return <Loading />
        else
            return <Error error={{message:'Invalid Profile'}}/>
        
    }

    return (
        <div className="profile">
            {renderProfile()}
        </div>
        
    )
}

export default Profile;