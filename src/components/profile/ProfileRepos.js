import React from "react";
import './ProfileRepos.css'
import { Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { timeSince } from "helpers/format";
import HubCard from "components/blocks/hubCard/HubCard";
import Loading from "components/misc/Loading";

const ProfileRepos = (props) => {
    let { repos, loading } = props;

    const renderRepos = () => {
        if (repos) {
            let repo = [];
            repos.forEach((e) => {
                const license = e.license? e.license.name : null
                const bottomItems = [
                    {icon: "fa-solid fa-code", text: e.language},
                    {icon: "fa-regular fa-star", text: e.stargazers_count},
                    {icon: "fa-solid fa-diagram-project", text: e.watchers_count},
                    {icon: "fa-solid fa-scale-balanced", text: license},
                    {icon: "fa-regular fa-clock", text: timeSince(e.updated_at)}
                ]
                repo.push(
                    <Col sm="12"
                         className="repo">
                        <Link to={`/profile/${e.owner.login}/${e.name}/`}>
                            <HubCard 
                                title={e.name}
                                subTitle={e.description}
                                bottomItems={bottomItems}
                            />
                        </Link>
                    </Col>
                    
                );
            });
            return repo
        }
        else if (loading) 
            return <Loading />
        
    }

    if (repos && repos.length > 0) {
        return (
            <div className="profileRepos">
                <div className="headerSeparator mb-2">
                    Repositories
                </div>
                <Row>
                    {renderRepos()}
                </Row>
                <br/>
            </div>      
        )
    }
}

export default ProfileRepos;