import React from 'react';
import { Col, Row } from 'react-bootstrap';
import HubCard from 'components/blocks/hubCard/HubCard';


const TopContributors = (props) => {
    let { contributorsList } = props; 

    const renderContributors = () => {
        let contributors = []
        contributorsList.forEach((e) => {
            contributors.append(
                <Col>
                    <HubCard 
                        title={e.login}
                        image={e.avatar_url}
                    />
                </Col>
            )
        });
        return contributors;
    }

    return (
        <Row>
            {renderContributors()}
        </Row>
    )
}

export default TopContributors;