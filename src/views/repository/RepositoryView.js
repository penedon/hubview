import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import githubAxios from 'axios/github';
import HeaderMenu from 'components/menu/HeaderMenu';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BranchMenu from 'components/repository/BranchMenu';
import CommitList from 'components/repository/CommitList';
import Error from 'components/misc/Error';
import './RepositoryView.css';

const RepositoryView = () => {
    const { username, repository } = useParams();
    let [branches, setBranches] = useState([]);
    let [commits, setCommits] = useState([]);
    let [selectedBranch, setSelectedBranch] = useState(null);
    let [error, setError] = useState(null);

    let fetchBranches = (username, repository) => (
        githubAxios.get(`repos/${username}/${repository}/branches`)
        .then(response => {
            setBranches(response.data)
        })
        .catch(err => {
            setError(err);
        })
    );

    let fetchCommits = (username, repository, branch) => (
        githubAxios.get(`repos/${username}/${repository}/commits?sha=${branch.commit.sha}`)
        .then(response => {
            return response.data;
        })
    );
    
    useEffect(() => {
        document.title = `${repository} | HubView `
        fetchBranches(username, repository);
    }, [username, repository]);

    useEffect(() => {
        if (branches.length > 0) {
            setSelectedBranch(branches[0]);
        }
    }, [branches])

    useEffect(() => {
        if (selectedBranch) {
            fetchCommits(username, repository, selectedBranch).then(setCommits);
        }
    }, [selectedBranch]);

    const renderRepository = () => {
        if (!error) {
            return (
                <div>
                    <Link to={`/profile/${username}`}>
                        <div className='backToProfile'>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                            <span>Profile</span>
                        </div>
                        
                    </Link>
                    <h3>
                        {repository}
                    </h3>
                    <div className='repository'>
                        <Row>
                            <Col md={3}
                                 className="branchColumn">
                                <div className="headerSeparator">
                                    Branches
                                </div>
                                <BranchMenu branches={branches}
                                            selected={selectedBranch}
                                            setSelectedBranch={setSelectedBranch}/>
                                <hr className='branchRowSeparator'/>
                            </Col>
                            <Col md={9}>
                                <div className="headerSeparator">
                                    Commits
                                </div>
                                <CommitList commits={commits}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='repository'>
                    <Error error={error}/>
                </div>
            )
        }
    }

    return (
        <div>
            <HeaderMenu />
            <br/>
            <Container>
                {renderRepository()}
            </Container>
            
            <div className='pageFooter'>
                Code developed by <Link to="/profile/penedon">@penedon</Link>
            </div>
        </div>
    )
}

export default RepositoryView;